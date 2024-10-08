import { AbstractApplicationContainer } from '@reapit-ludicrous/framework'
import { APIGatewayProxyEvent, Handler, Context } from 'aws-lambda'
import { RouteMetadataContainer } from './route.metadata.container'
import { ArgumentMetadata } from './decorators'
import { HTTP_STATUS_CODE, HttpException, NotFoundException } from './exceptions'
import { ARGUMENT } from './constants'
import { HttpMethod } from './types'

export class HttpApplicationContainer extends AbstractApplicationContainer {
  private mapArgumentMetadataToValues(
    { name, type, options }: ArgumentMetadata,
    {
      parameters,
      query,
      body,
      identity,
      event,
    }: {
      parameters: { [s: string]: any }
      query: { [s: string]: any } | null
      body: string | null
      identity: any
      event: APIGatewayProxyEvent
    },
  ): any {
    switch (type) {
      case 'QUERY':
        return query ? query[name as string] || undefined : undefined
      case 'PARAMETER':
        return parameters[name as string]
      case 'BODY':
        return options?.parseJson ? JSON.parse(body || '{}') : body
      case 'IDENTITY':
        return identity // TODO need to be resolved from authentication provider
      case 'EVENT':
        return event
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

    console.log('resolved route', route)

    try {
      if (!route) throw new NotFoundException()

      const controller = this.get<any>(route.controllerToken)

      const argumentMetadata: ArgumentMetadata[] =
        Reflect.getMetadata(`${ARGUMENT}::${route.method.toString()}`, controller) || []

      const args: { [s: string]: any }[] = argumentMetadata.map((metadata) =>
        this.mapArgumentMetadataToValues(metadata, {
          parameters: route.match.params,
          query,
          body: event.body,
          identity: undefined,
          event,
        }),
      )

      const result = await controller[route.method](...args)

      if (typeof result === 'object' && result.statusCode) return result
      else return {
        // TODO offer alternative to statusCode handling
        statusCode: event.httpMethod === HttpMethod.POST ? HTTP_STATUS_CODE.CREATED : !result ? HTTP_STATUS_CODE.NO_CONTENT : HTTP_STATUS_CODE.OK,
        body: typeof result === 'object' || Array.isArray(result) ? JSON.stringify(result) : result,
      }
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
