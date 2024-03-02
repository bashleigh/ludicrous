import { CONTROLLER, METHOD } from './constants'
import { DevHttpApplicationContainer } from './application.container'
import { RouteMetadataContainer } from './metadata.container'
import { Provider, isConstructorProvider } from './provider'

export interface ApplicationOptions {
  bootLogging?: boolean
  routeLogging?: boolean
}

export class Boot {
  static application(
    {
      providers,
    }: {
      providers: Provider[]
    },
    { bootLogging, routeLogging }: ApplicationOptions = {
      bootLogging: true,
      routeLogging: true,
    },
  ) {
    // const metadataContainer = new MetadataContainer(bootLogging)
    const routeMetadata = new RouteMetadataContainer(bootLogging)
    // TODO find a solution to conditionally change the imported class for development
    const container = new DevHttpApplicationContainer(routeLogging)

    providers.forEach((provider) => {
      const isController = Reflect.hasOwnMetadata(CONTROLLER, provider)
      const isFunction = isConstructorProvider(provider)

      // metadataContainer.add({
      //   type: isController ? 'controller' : 'provider',
      //   provider,
      //   token: !isFunction ? provider.token : provider.constructor.name,
      // })
      container.add(provider)

      if (isFunction && isController) {
        const prototype = provider.prototype
        const controllerToken = provider.name
        const methods = Reflect.ownKeys(prototype)

        methods?.forEach((method) => {
          const methodMetadata = Reflect.getOwnMetadata(METHOD, prototype[method])

          if (!methodMetadata) return

          routeMetadata.addRoute({
            method,
            httpMethod: methodMetadata,
            controllerToken,
            provider,
          })
        })
      }
    })

    // container.add({
    //   token: MetadataContainer.name,
    //   useValue: metadataContainer,
    // })

    container.add({
      token: RouteMetadataContainer.name,
      useValue: routeMetadata,
    })

    // container.add(AuthenticationProvider)

    bootLogging && console.log('Application successfully booted')

    return container
  }
}
