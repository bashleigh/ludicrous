import { HANDLE, Handle } from './handle'

describe('Handle', () => {
  it('Can set handle', () => {
    class TestClass {
      @Handle()
      myMethod() {}
    }

    const metadata = Reflect.getMetadata(HANDLE, TestClass.prototype)

    expect(metadata).toBe('myMethod')
  })
})
