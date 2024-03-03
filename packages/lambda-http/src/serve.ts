import http from 'http'
import { HttpApplicationContainer } from './http.application.container'
import { Context } from 'aws-lambda'

export const serve = async ({ application, port = 3000 }: {application: HttpApplicationContainer, port?: number }) => {
  application.cache()
  console.log('serving from port', port)
  return http
    .createServer(async (request, response) => {
      //@ts-ignore
      const [path, query] = request.url?.split('?')
      const result = await application.handle(
        {
          path: path,
          httpMethod: request.method,
          queryStringParameters: Object.fromEntries(new URLSearchParams(query)),
        },
        {} as Context,
        () => {},
      )

      response.writeHead(result.statusCode)
      response.end(result.body || result.message)
    })
    .listen(port)
}
