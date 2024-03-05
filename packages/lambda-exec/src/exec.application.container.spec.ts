import { Provide } from '@reapit-ludicrous/framework'
import { Boot } from './boot'
import { Handle } from './decorators'
import { APIGatewayEvent } from 'aws-lambda'

describe('ExecApplicationContainer', () => {
  it('Can instance provider using DI from container', () => {
    @Provide()
    class ProviderTest {}

    class Controller {
      constructor(public readonly provider: ProviderTest) {}

      @Handle()
      myMethod() {}
    }

    const application = Boot.application(
      {
        providers: [ProviderTest],
        controller: Controller,
      },
      {
        bootLogging: false,
      },
    )

    const instanced = application.get(Controller)

    expect(instanced).toBeInstanceOf(Controller)
  })

  it('Calling application.handle will call controller.handle', () => {
    const method = jest.fn()

    class Controller {
      @Handle()
      handle() {
        method()
      }
    }

    const application = Boot.application(
      {
        providers: [],
        controller: Controller,
      },
      {
        bootLogging: false,
      },
    )

    application.handle({} as APIGatewayEvent)

    expect(method).toHaveBeenCalled()
  })
})
