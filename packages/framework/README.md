# Ludicrous Framework 

A tiny TypeScript container for resolving classes and their dependencies.

## Getting Started

### Install

```bash
$ yarn add @reapit-ludicrous/framework
```

### Extending the ApplicationContainer

```ts
import { AbstractApplicationContainer } from '@reapit-ludicrous/framework'

class MyApplicationContainer extends AbstractApplicationContainer {
  handle() {
    // Do something 
  }
}

const application = new MyApplicationContainer()

application.add({
  token: 'my-token',
  useValue: 'anything',
})

const provider = application.get('my-token')

console.log('provider', provider) // provider, 'anything'
```

### MetadataContainer

The metadata container is used to store information about metadata of your application. For example. The `http-lambda` package extends the `AbstractMetadataContainer` to store class metadata information about http routing for the application.

On boot of the http-lambda application, route metadata is resolved from the controllers and methods and stored within the `RouteMetadataContainer`. This metadata is then used to resolved incoming requests to the responding controller.method.

Below is a simplified version of this approach
```ts
import { AbstractMetadataContainer } from '@reapit-ludicrous/framrwork'

type RouteMetadata = {
  token: string,
  controllerToken: string,
  httpMethod: string,
  method: string,
}

export class RouteMetadataContainer extends AbstractMetadataContainer<RouteMetadata> {


  addRoute(provider: constructor, method: string, httpMethod: string) {
    const controllerMetadata = Reflect.getMetadata(CONTROLLER, provider)
    const pathMetadata = Reflect.getOwnMetadata(PATH, provider.prototype[method])
    const fullPath = [controllerMetadata.path.replace(/^\//g, ''), pathMetadata]

    super.add({
      token: `${httpMethod}-${fullPath}`,
      controllerToken: provider.name,
      httpMethod,
      method,
    })
  }

  resolvePathToRoute(path: string, method: string) {
    return Object.values(this.metadata).find((metadata) => metadata.httpMethod === method && metadata.path === path)
  }
}
```

The `RouteMetadataContainer` is then used to obtain the class token to resolve the controller to from the application


```ts

class MyApplicationContainer extends AbstractApplicationContainer {
  handle() {
    const routeMetadata = this.get<RouteMetadataContainer>('route-metadata')

    const metadata = routeMetadata.resolvePathToRoute('controller/method', 'GET')
  }
}

// this would be within an project file
@Controller('controller')
class TestController {
  @Get('method')
  myHandler() {

  }
}

// This would be done within a boot class
const application = new MyApplicationContainer()

const routeMetadataContainer = new RouteMetadataContainer()

routeMetadataContainer.addRoute(TestController, 'myHandler', 'GET')

application.add({
  token: 'route-metadata',
  useValue: routeMetadataContainer,
})

```
