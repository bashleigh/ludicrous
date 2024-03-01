import { HttpMethod } from '../../types'
import { METHOD, PATH } from '../../constants'
import { Patch } from './patch'

describe('Patch', () => {
  it('Can add PATCH method metadata to controller', () => {
    class Test {
      @Patch()
      method() {}
    }

    const methodMetadata = Reflect.getMetadata(METHOD, Test.prototype.method)
    const pathMetadata = Reflect.getMetadata(PATH, Test.prototype.method)

    expect(methodMetadata).toBeDefined()
    expect(methodMetadata).toBe(HttpMethod.PATCH)
    expect(pathMetadata).toBeDefined()
    expect(pathMetadata).toBe('/')
  })
})
