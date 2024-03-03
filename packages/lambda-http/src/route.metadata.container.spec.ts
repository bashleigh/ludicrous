import { Controller, Get, Post } from './decorators'
import { RouteMetadataContainer } from './route.metadata.container'
import { HttpMethod } from './types'

describe('RouteMetadataContainer', () => {
  it('Can add routes to metadata container', () => {
    @Controller('my-path')
    class TestController {
      @Get()
      method() {}
    }
    const container = new RouteMetadataContainer(false)

    container.addRoute({
      provider: TestController,
      method: 'method',
      httpMethod: HttpMethod.GET,
      controllerToken: TestController.name,
    })

    const route = container.resolvePathToRouteMetadata('my-path', HttpMethod.GET)

    expect(route).toBeDefined()
    expect(route?.token).toBe('GET-my-path')
    expect(route?.controllerMetadata).toStrictEqual({ path: 'my-path' })
    expect(route?.httpMethod).toBe(HttpMethod.GET)
  })

  it('Can resolve complex path info', () => {
    @Controller('controller')
    class TestController {
      @Get('method')
      method() {}

      @Post('method')
      create() {}
    }
    const container = new RouteMetadataContainer(false)

    container.addRoute({
      provider: TestController,
      method: 'method',
      httpMethod: HttpMethod.GET,
      controllerToken: TestController.name,
    })

    container.addRoute({
      provider: TestController,
      method: 'create',
      httpMethod: HttpMethod.POST,
      controllerToken: TestController.name,
    })

    const route = container.resolvePathToRouteMetadata('controller/method', HttpMethod.GET)
    const postRoute = container.resolvePathToRouteMetadata('controller/method', HttpMethod.POST)

    expect(route).toBeDefined()
    expect(route?.token).toBe('GET-controller/method')
    expect(route?.controllerMetadata).toStrictEqual({ path: 'controller' })
    expect(route?.httpMethod).toBe(HttpMethod.GET)

    expect(postRoute).toBeDefined()
    expect(postRoute?.httpMethod).toBe(HttpMethod.POST)
    expect(postRoute?.controllerMetadata).toStrictEqual({ path: 'controller' })
  })

  it('Match parameters', () => {
    @Controller('controller')
    class TestController {
      @Get('method/:id')
      method() {}
    }
    const container = new RouteMetadataContainer(false)

    container.addRoute({
      provider: TestController,
      method: 'method',
      httpMethod: HttpMethod.GET,
      controllerToken: TestController.name,
    })

    const route = container.resolvePathToRouteMetadata('controller/method/345678', HttpMethod.GET)

    expect(route).toBeDefined()
    expect(route?.match.params).toEqual({ id: '345678' })
  })
})
