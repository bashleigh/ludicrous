import { HttpMethod } from '../../types'
import { METHOD, PATH } from '../../constants'
import { Put } from './put'

describe('Put', () => {
  it('Can add Put method metadata to controller', () => {
    class Test {
      @Put()
      method() {}
    }

    const methodMetadata = Reflect.getMetadata(METHOD, Test.prototype.method)
    const pathMetadata = Reflect.getMetadata(PATH, Test.prototype.method)

    expect(methodMetadata).toBeDefined()
    expect(methodMetadata).toBe(HttpMethod.PUT)
    expect(pathMetadata).toBeDefined()
    expect(pathMetadata).toBe('')
  })
})
