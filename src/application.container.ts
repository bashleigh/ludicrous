import { APIGatewayProxyEvent, Context, Handler } from "aws-lambda";
import { Provider, isTokenProvider, isValueProvider } from "./provider";
import { INJECTABLES } from "./constants";
import { RouteMetadataContainer } from "./metadata.container";
import { HttpException, NotFoundException } from "./exceptions";
import http from 'http'

export class ApplicationContainer {
  private readonly providers: { [s: string]: Provider } = {}

  constructor(
    private readonly routeLogging: boolean = true,
  ) {}

  add(provider: Provider) {
    isValueProvider(provider) || isTokenProvider(provider) ? this.providers[provider.token] = provider : this.providers[provider.name] = provider
  }

  get<T extends any>(token: Function | string): T {
    const provider = this.providers[typeof token === 'function' ? token.name : token]

    if (!provider) throw new Error(`failed to get provider [${typeof token === 'function' ? token.name : token}]`)

    if (isValueProvider(provider)) return provider.useValue

    const providerClass = isTokenProvider(provider) ? provider.useClass : provider

    const paramsInfo = Reflect.getOwnMetadata(INJECTABLES, providerClass)

    const resolvedInjectables = (paramsInfo || []).map((param: { injectToken: string}) => this.get(param.injectToken))

    return new providerClass(...resolvedInjectables)
  }

  handle: Handler = async (event: APIGatewayProxyEvent, context: Context) => {
    this.routeLogging && console.log('event', event)
    const routeMetadata = this.get<RouteMetadataContainer>(RouteMetadataContainer)
    const path = event.path.replace(/^\//, '')

    const route = routeMetadata.resolvePathToRouteMetadata(path, event.httpMethod.toLowerCase())

    console.log('route', route)

    try {

      if (!route) throw new NotFoundException()

      const controller = this.get<any>(route.controllerToken)

      // TODO add route logging and use condition this.routeLogging
      console.log('controller', controller[route.method])

      // TODO not sure how to call it?
      const result = await controller[route.method]()

      if (typeof result === 'object' && result.statusCode) return result
      else return { statusCode: 200, body: result }

      //TODO get controller using route info

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
    return http.createServer(async (request, response) => {
      const result = await this.handle({
        path: request.url,
        httpMethod: request.method,
      }, {} as Context, () => {
      })

      // response.write(result.body || result.message)
      // response.writeHead(result.statusCode)
      response.writeHead(result.statusCode)
      response.end(result.body || result.message)
    }).listen(port)
  }
}
