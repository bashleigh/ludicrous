import { CONTROLLER } from '../../constants'
import { Controller } from './controller'
import { INJECTABLES } from '@reapit-ludicrous/framework'

describe('Controller', () => {
  it('Can define path and injectables on controller', () => {
    class Provider {}

    @Controller('root-path')
    class TestController {
      constructor(private readonly provider: Provider) {}
    }

    const controllerMetadata = Reflect.getMetadata(CONTROLLER, TestController)
    const injectableMetadata = Reflect.getMetadata(INJECTABLES, TestController)

    expect(controllerMetadata.path).toBe('root-path')
    expect(injectableMetadata[0]).toStrictEqual({ injectToken: Provider.name, typeName: Provider.name })
  })
})
