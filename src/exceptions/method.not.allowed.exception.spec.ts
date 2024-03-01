import { HttpException } from './http.exception'
import { HTTP_STATUS_CODE } from './http.response.code'
import { MethodNotAllowedException } from './method.not.allowed.exception'

describe('MethodNotAllowedException', () => {
  it('Can throw and catch BadRequestException', () => {
    try {
      throw new MethodNotAllowedException()
      expect(true).toBeFalsy()
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error).toBeInstanceOf(MethodNotAllowedException)
      expect((error as HttpException).httpCode).toBe(HTTP_STATUS_CODE.METHOD_NOT_ALLOWED)
    }
  })
})
