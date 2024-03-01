import { CONTROLLER, METHOD, PATH } from './constants'
import { ApplicationContainer } from './application.container'
import { MetadataContainer, RouteMetadataContainer } from './metadata.container'
import { Provider, isConstructorProvider } from './provider'
import { AuthenticationProvider } from './authentication.provider'
import { pathToRegexp, match } from 'path-to-regexp'

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
    const metadataContainer = new MetadataContainer(bootLogging)
    const routeMetadata = new RouteMetadataContainer(bootLogging)
    const container = new ApplicationContainer(routeLogging)

    providers.forEach((provider) => {
      const isController = Reflect.hasOwnMetadata(CONTROLLER, provider)
      const isFunction = isConstructorProvider(provider)

      metadataContainer.add({
        type: isController ? 'controller' : 'provider',
        provider,
        token: !isFunction ? provider.token : provider.constructor.name,
      })
      container.add(provider)

      if (isFunction && isController) {
        const prototype = provider.prototype
        const controllerToken = provider.name
        const methods = Reflect.ownKeys(prototype)

        methods?.forEach((method) => {
          const methodMetadata = Reflect.getOwnMetadata(METHOD, prototype[method])
          const pathMetadata = Reflect.getOwnMetadata(PATH, prototype[method])

          if (!methodMetadata) return

          const controllerMetadata = Reflect.getOwnMetadata(CONTROLLER, provider)

          const fullPath = [controllerMetadata.path.replace(/^\//g, ''), pathMetadata].join('/').replace(/\/\//g, '/')

          routeMetadata.add({
            controllerToken,
            httpMethod: methodMetadata,
            method,
            controllerMetadata,
            token: fullPath,
            pathReg: pathToRegexp(fullPath),
            match: match(fullPath),
          })
        })
      }
    })

    container.add({
      token: MetadataContainer.name,
      useValue: metadataContainer,
    })

    container.add({
      token: RouteMetadataContainer.name,
      useValue: routeMetadata,
    })

    container.add(AuthenticationProvider)

    bootLogging && console.log('Application successfully booted')

    return container
  }
}
