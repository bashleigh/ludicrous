import { HttpException } from './http.exception'
import { HTTP_STATUS_CODE } from './http.response.code'
import { UnauthorizedException } from './unauthorized.exception'

describe('UnauthorizedException', () => {
  it('Can throw and catch BadRequestException', () => {
    try {
      throw new UnauthorizedException()
      expect(true).toBeFalsy()
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error).toBeInstanceOf(UnauthorizedException)
      expect((error as HttpException).httpCode).toBe(HTTP_STATUS_CODE.UNAUTHORIZED)
    }
  })
})
