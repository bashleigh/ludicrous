import { AbstractApplicationContainer } from './application.container'
import { Boot } from './boot'

describe('Boot', () => {
  it('Can create application from Boot.application static method', () => {
    expect(
      Boot.application(
        { providers: [] },
        {
          bootLogging: false,
          routeLogging: false,
        },
      ),
    ).toBeInstanceOf(AbstractApplicationContainer)
  })

  it('Boot appplication returns with serve method', () => {
    expect(
      Boot.application(
        { providers: [] },
        {
          bootLogging: false,
          routeLogging: false,
        },
      ),
    ).toHaveProperty('serve')
  })

  it('Boot appplication returns with handle method', () => {
    expect(
      Boot.application(
        { providers: [] },
        {
          bootLogging: false,
          routeLogging: false,
        },
      ),
    ).toHaveProperty('handle')
  })
})
