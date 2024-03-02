import { AbstractApplicationContainer } from "@reapit-ludicrous/framework"
import { APIGatewayProxyEvent, Handler, Context } from "aws-lambda"
import { RouteMetadataContainer } from "./route.metadata.container"
import { ArgumentMetadata } from "./decorators"
import { HttpException, NotFoundException } from "./exceptions"
import { ARGUMENT } from "./constants"

export class HttpApplicationContainer extends AbstractApplicationContainer<Handler> {
  private mapArgumentMetadataToValues(
    { name, type }: ArgumentMetadata,
    {
      parameters,
      query,
      body,
      identity,
    }: {
      parameters: { [s: string]: any }
      query: { [s: string]: any } | null
      body: any
      identity: any
    },
  ): any {
    switch (type) {
      case 'QUERY':
        return query ? query[name as string] || undefined : undefined
      case 'PARAMETER':
        return parameters[name as string]
      case 'BODY':
        return body
      case 'IDENTITY':
        return identity // TODO need to be resolved from authentication provider
    }
  }

  cache() {
    console.log('Caching all providers for dev validation')
    Object.entries(this.providers).forEach(([token, provider]) => {
      console.log('token', token, provider)
      this.get(token)
    })
  }

  handle: Handler = async (event: APIGatewayProxyEvent, context: Context) => {
    this.routeLogging && console.log('event', event)
    const routeMetadata = this.get<RouteMetadataContainer>(RouteMetadataContainer)
    const path = event.path.replace(/^\//, '')
    const query = event.queryStringParameters

    const route = routeMetadata.resolvePathToRouteMetadata(path, event.httpMethod.toUpperCase())

    console.log('route', route)

    try {
      if (!route) throw new NotFoundException()

      const controller = this.get<any>(route.controllerToken)

      // TODO add route logging and use condition this.routeLogging
      console.log('controller', controller[route.method])

      const argumentMetadata: ArgumentMetadata[] =
        Reflect.getMetadata(`${ARGUMENT}::${route.method.toString()}`, controller) || []

      const args: { [s: string]: any }[] = argumentMetadata.map((metadata) =>
        this.mapArgumentMetadataToValues(metadata, {
          parameters: route.match.params,
          query,
          body: event.body,
          identity: undefined,
        }),
      )

      console.log('arguments', args)

      // TODO call the controller method with the required parameters
      const result = await controller[route.method](...args)

      if (typeof result === 'object' && result.statusCode) return result
      else return { statusCode: 200, body: result }
    } catch (error) {
      console.error(error)
      if (error instanceof HttpException) {
        console.log('returning exception status')
        return {
          statusCode: error.httpCode,
          message: error.message,
        }
      }

      return {
        statusCode: 500,
        message: 'Internal Server Error',
      }
    }
  }
}
