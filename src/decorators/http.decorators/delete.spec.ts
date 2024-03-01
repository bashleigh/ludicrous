import { HttpMethod } from '../../types'
import { METHOD, PATH } from '../../constants'
import { Delete } from './delete'

describe('Delete', () => {
  it('Can add DELETE method metadata to controller', () => {
    class Test {
      @Delete()
      method() {}
    }

    const methodMetadata = Reflect.getMetadata(METHOD, Test.prototype.method)
    const pathMetadata = Reflect.getMetadata(PATH, Test.prototype.method)

    expect(methodMetadata).toBeDefined()
    expect(methodMetadata).toBe(HttpMethod.DELETE)
    expect(pathMetadata).toBeDefined()
    expect(pathMetadata).toBe('/')
  })
})
