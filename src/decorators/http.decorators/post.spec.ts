import { HttpMethod } from '../../types'
import { METHOD, PATH } from '../../constants'
import { Post } from './post'

describe('Post', () => {
  it('Can add POST method metadata to controller', () => {
    class Test {
      @Post()
      method() {}
    }

    const methodMetadata = Reflect.getMetadata(METHOD, Test.prototype.method)
    const pathMetadata = Reflect.getMetadata(PATH, Test.prototype.method)

    expect(methodMetadata).toBeDefined()
    expect(methodMetadata).toBe(HttpMethod.POST)
    expect(pathMetadata).toBeDefined()
    expect(pathMetadata).toBe('/')
  })
})
