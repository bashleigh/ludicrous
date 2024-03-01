import { HttpMethod } from '../../types'
import { METHOD, PATH } from '../../constants'
import { Get } from './get'

describe('Get', () => {
  it('Can add GET method metadata to controller', () => {
    class Test {
      @Get()
      method() {}
    }

    const methodMetadata = Reflect.getMetadata(METHOD, Test.prototype.method)
    const pathMetadata = Reflect.getMetadata(PATH, Test.prototype.method)

    expect(methodMetadata).toBeDefined()
    expect(methodMetadata).toBe(HttpMethod.GET)
    expect(pathMetadata).toBeDefined()
    expect(pathMetadata).toBe('/')
  })
})
