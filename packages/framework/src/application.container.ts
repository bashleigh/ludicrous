import { Provider, isFactoryProvider, isTokenProvider, isValueProvider } from './provider'
import { INJECTABLES } from './constants'

export abstract class AbstractApplicationContainer {
  protected readonly providers: { [s: string]: Provider } = {}
  protected readonly instancedProviders: { [s: string]: any } = {}

  constructor(protected readonly routeLogging: boolean = true) {}

  add(provider: Provider) {
    isValueProvider(provider) || isTokenProvider(provider) || isFactoryProvider(provider)
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
    if (isFactoryProvider(provider)) {
      return provider.useFactory() // TODO resolve injectables?
    }

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

  abstract handle(...any: any[]): any
}
