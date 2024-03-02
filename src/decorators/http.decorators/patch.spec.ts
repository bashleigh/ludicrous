import { HttpMethod } from '../../types'
import { METHOD, PATH } from '../../constants'
import { Patch } from './patch'
import { Controller } from '../class.decorators'

describe('Patch', () => {
  it('Can add PATCH method metadata to controller', () => {
    @Controller('controller')
    class Test {
      @Patch('method')
      method() {}
    }

    const methodMetadata = Reflect.getMetadata(METHOD, Test.prototype.method)
    const pathMetadata = Reflect.getMetadata(PATH, Test.prototype.method)

    expect(methodMetadata).toBeDefined()
    expect(methodMetadata).toBe(HttpMethod.PATCH)
    expect(pathMetadata).toBeDefined()
    expect(pathMetadata).toBe('method')
  })
})
