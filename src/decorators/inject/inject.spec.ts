import { INJECTABLES } from '../../constants'
import { Inject } from '.'
import { Provide } from '../class.decorators'

describe('Inject', () => {
  it('Can define metadata on constructor property', () => {
    @Provide()
    class Test {
      constructor(
        @Inject('my-token')
        private readonly property: any,
      ) {}
    }

    const injectableMetadata = Reflect.getMetadata(INJECTABLES, Test)

    expect(injectableMetadata[0]).toStrictEqual({
      injectToken: 'my-token',
      typeName: 'Object',
    })
  })
})
