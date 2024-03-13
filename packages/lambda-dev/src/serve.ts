import http from 'http'
import { HttpApplicationContainer } from '../../lambda-http/src/http.application.container'
import { Context, APIGatewayProxyEvent } from 'aws-lambda'
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
        let start

        const mockEvent: Partial<APIGatewayProxyEvent> = {
          path,
          httpMethod: request.method || '',
          queryStringParameters: Object.fromEntries(new URLSearchParams(query)),
          body: body?.toString() || null,
          headers: request?.headers as { [s: string]: string },
        }

        if (profiler) {
          if (path.startsWith('/profiler') || path.includes('_next')) {
            next?.getRequestHandler()(request, response)
            return
          } else if (path !== '/api/profiler') {
            start = process.hrtime()

            const routeMetadata = application.get<RouteMetadataContainer>(RouteMetadataContainer)

            const route = routeMetadata.resolvePathToRouteMetadata(
              path.replace(/^\//, ''),
              request.method?.toUpperCase() || '',
            )

            const controller = route ? application.get<any>(route.controllerToken) : undefined

            profilerProvider.addEvent(mockEvent, route, controller)
          }
        }

        const result = await application.handle(mockEvent, {} as Context, () => {})

        if (profiler && path !== '/profiler' && path !== '/api/profiler' && !path.includes('_next')) {
          const elapsed = process.hrtime(start)[1] / 1000000
          const executionTime = process.hrtime(start)[0] + ' s, ' + elapsed.toFixed(3) + ' ms'
          profilerProvider.addResponse(path, result, executionTime)
        }

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
