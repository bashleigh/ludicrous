import http from 'http'
import { HttpApplicationContainer } from '../http.application.container'
import { Context } from 'aws-lambda'
import { ProfilerProvider } from './profiler.provider'
import { ProfilerController } from './profiler.controller'
import { RouteMetadataContainer } from '../route.metadata.container'
import { METHOD } from '../constants'

export const serve = async ({
  application,
  port = 3000,
  profiler = true,
}: {
  application: HttpApplicationContainer
  port?: number
  profiler?: boolean
}) => {
  if (profiler) {
    application.add(ProfilerProvider)
    application.add(ProfilerController)

    const routeMetadataContainer = application.get<RouteMetadataContainer>(RouteMetadataContainer)

    const methods = Reflect.ownKeys(ProfilerController.prototype)

    methods?.forEach((method) => {
      // @ts-ignore
      console.log('method', method, ProfilerController.prototype, ProfilerController.prototype[method])

      const methodMetadata = Reflect.getMetadata(METHOD, (ProfilerController.prototype as any)[method as any] as any)

      if (!methodMetadata) return
      routeMetadataContainer.addRoute({
        method,
        httpMethod: methodMetadata,
        controllerToken: ProfilerController.name,
        provider: ProfilerController,
      })
    })
  }

  application.cache()
  console.log('serving from port', port)
  return http
    .createServer((request, response) => {
      let body: Buffer | undefined = undefined
      const profilerProvider = application.get<ProfilerProvider>(ProfilerProvider)

      request.on('readable', () => {
        const read = request.read()
        if (read !== undefined && read !== null) body ? (body += read) : (body = read)
      })

      request.on('end', async () => {
        const url = request.url || ''
        const [path, query] = url.split('?')

        const mockEvent = {
          path,
          httpMethod: request.method,
          queryStringParameters: Object.fromEntries(new URLSearchParams(query)),
          body: body?.toString() || null,
        }

        if (profiler) {
          profilerProvider.addEvent(mockEvent)
        }

        const result = await application.handle(mockEvent, {} as Context, () => {})

        if (profiler) profilerProvider.addResponse(path, result)

        response.writeHead(result.statusCode)
        response.end(
          result.body
            ? typeof result.body === 'object' || Array.isArray(result.body)
              ? JSON.stringify(result.body)
              : result.body
            : result.message,
        )
      })
    })
    .listen(port)
}
