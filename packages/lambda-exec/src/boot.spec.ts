import { Boot } from "./boot"
import { Handle } from "./decorators"
import { ExecApplicationContainer } from "./exec.application.container"

describe('Boot', () => {
  it('Static application method will return instance of ExecApplicationContainer', () => {
    class Controller {
      @Handle()
      test() {}
    }
    const application = Boot.application({ providers: [], controller: Controller }, { bootLogging: false })

    expect(application).toBeInstanceOf(ExecApplicationContainer)
  })

  it('Static application method will throw error if class has no handle method', () => {
    class Controller {
    }

    try {
      const application = Boot.application({ providers: [], controller: Controller }, { bootLogging: false })
      expect(true).toBeFalsy()
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
})
