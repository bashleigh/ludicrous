import { APIGatewayProxyEvent, Context, Handler } from 'aws-lambda'
import { Provider, isTokenProvider, isValueProvider } from './provider'
import { INJECTABLES, PARAMETER } from './constants'
import { RouteMetadataContainer } from './metadata.container'
import { HttpException, NotFoundException } from './exceptions'
import http from 'http'
import { match } from 'path-to-regexp'
import { ArgumentMetadata } from './decorators'

export class ApplicationContainer {
  private readonly providers: { [s: string]: Provider } = {}

  constructor(private readonly routeLogging: boolean = true) {}

  add(provider: Provider) {
    isValueProvider(provider) || isTokenProvider(provider)
      ? (this.providers[provider.token] = provider)
      : (this.providers[provider.name] = provider)
  }

  get<T extends any>(token: Function | string): T {
    const provider = this.providers[typeof token === 'function' ? token.name : token]

    if (!provider) throw new Error(`failed to get provider [${typeof token === 'function' ? token.name : token}]`)

    if (isValueProvider(provider)) return provider.useValue

    const providerClass = isTokenProvider(provider) ? provider.useClass : provider

    const paramsInfo = Reflect.getOwnMetadata(INJECTABLES, providerClass)

    const resolvedInjectables = (paramsInfo || []).map((param: { injectToken: string }) => this.get(param.injectToken))

    return new providerClass(...resolvedInjectables)
  }

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

  handle: Handler = async (event: APIGatewayProxyEvent, context: Context) => {
    this.routeLogging && console.log('event', event)
    const routeMetadata = this.get<RouteMetadataContainer>(RouteMetadataContainer)
    const path = event.path.replace(/^\//, '')
    const query = event.queryStringParameters

    const route = routeMetadata.resolvePathToRouteMetadata(path, event.httpMethod.toLowerCase())

    console.log('route', route)

    try {
      if (!route) throw new NotFoundException()

      const controller = this.get<any>(route.controllerToken)

      // TODO add route logging and use condition this.routeLogging
      console.log('controller', controller[route.method])

      const parameterMetadata: ArgumentMetadata[] =
        Reflect.getMetadata(`${PARAMETER}::${route.method.toString()}`, controller) || []

      const args: { [s: string]: any }[] = parameterMetadata.map((metadata) =>
        this.mapArgumentMetadataToValues(metadata, {
          parameters: route.match.params,
          query,
          body: event.body,
          identity: undefined,
        }),
      )

      console.log('parameters', args)

      // TODO call the controller method with the required parameters
      const result = await controller[route.method](...args)

      if (typeof result === 'object' && result.statusCode) return result
      else return { statusCode: 200, body: result }

      throw new NotFoundException()
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

  serve(port: number = 3000) {
    console.log('serving from port', port)
    return http
      .createServer(async (request, response) => {
        //@ts-ignore
        const [path, query] = request.url?.split('?')
        const result = await this.handle(
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
}
