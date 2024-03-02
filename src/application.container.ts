import { APIGatewayProxyEvent, Context, Handler } from 'aws-lambda'
import { Provider, isTokenProvider, isValueProvider } from './provider'
import { ARGUMENT, INJECTABLES } from './constants'
import { RouteMetadataContainer } from './metadata.container'
import { HttpException, NotFoundException } from './exceptions'
import http from 'http'
import { ArgumentMetadata } from './decorators'

export abstract class AbstractApplicationContainer<HandlerType> {
  protected readonly providers: { [s: string]: Provider } = {}
  protected readonly instancedProviders: { [s: string]: any } = {}

  constructor(protected readonly routeLogging: boolean = true) {}

  add(provider: Provider) {
    isValueProvider(provider) || isTokenProvider(provider)
      ? (this.providers[provider.token] = provider)
      : (this.providers[provider.name] = provider)
  }

  private resovleProvider<T>(token: string | Function, prototype?: string): T {
    const provider = this.providers[typeof token === 'function' ? token.name : token]

    if (!provider)
      throw new Error(
        `failed to get provider [${typeof token === 'function' ? token.name : token}] when injecting to [${prototype}]. Make sure the provider has been added to the application`,
      )

    if (isValueProvider(provider)) return provider.useValue

    const providerClass = isTokenProvider(provider) ? provider.useClass : provider

    if (this.instancedProviders[providerClass.name]) return this.instancedProviders[providerClass.name]

    const paramsInfo = Reflect.getOwnMetadata(INJECTABLES, providerClass)

    const resolvedInjectables = (paramsInfo || []).map(
      (param: { injectToken: string }) => this.resovleProvider(param.injectToken, providerClass.name),
      providerClass.name,
    )

    const resolved = new providerClass(...resolvedInjectables)

    this.instancedProviders[providerClass.name] = resolved

    return resolved
  }

  get<T>(token: Function | string): T {
    return this.resovleProvider(token)
  }

  abstract handle: HandlerType
}

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

export class DevHttpApplicationContainer extends HttpApplicationContainer {
  private cache() {
    console.log('Caching all providers for dev validation')
    Object.entries(this.providers).forEach(([token, provider]) => {
      console.log('token', token, provider)
      this.get(token)
    })
  }

  serve(port: number = 3000) {
    this.cache()
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
