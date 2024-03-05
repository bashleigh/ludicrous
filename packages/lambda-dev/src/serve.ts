import http from 'http'
import { HttpApplicationContainer } from '../../lambda-http/src/http.application.container'
import { Context } from 'aws-lambda'
import { ProfilerProvider } from './profiler.provider'
import { ProfilerController } from './profiler.controller'
import { RouteMetadataContainer } from '../../lambda-http/src/route.metadata.container'
import { METHOD } from '../../lambda-http/src/constants'
import createServer, { NextServer } from 'next/dist/server/next'
import { resolve } from 'path'

export const serve = async ({
  application,
  port = 3000,
  profiler = true,
}: {
  application: HttpApplicationContainer
  port?: number
  profiler?: boolean
}) => {
  let next: undefined | NextServer
  if (profiler) {
    application.add(ProfilerProvider)
    application.add(ProfilerController)

    const appPath = resolve(__dirname, 'app')

    next = createServer({
      dev: true,
      dir: appPath,
    })

    await next.prepare()

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

          console.log('path', path)

          if (path === '/profiler' || path.includes('_next')) { // check starts with
            console.log('profiler rendering react', next)
            next?.getRequestHandler()(request, response) // remove profiler prefix and return path
            return
          } else if (path !== '/api/profiler/') profilerProvider.addEvent(mockEvent)
        }

        const result = await application.handle(mockEvent, {} as Context, () => {})

        if (profiler && path !== '/profiler' && path !== '/api/profiler' && !path.includes('_next')) profilerProvider.addResponse(path, result)

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
