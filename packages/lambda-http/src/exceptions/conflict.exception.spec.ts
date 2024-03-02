import { ConflictException } from './conflict.exception'
import { HttpException } from './http.exception'
import { HTTP_STATUS_CODE } from './http.response.code'

describe('ConflictException', () => {
  it('Can throw and catch BadRequestException', () => {
    try {
      throw new ConflictException()
      expect(true).toBeFalsy()
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error).toBeInstanceOf(ConflictException)
      expect((error as HttpException).httpCode).toBe(HTTP_STATUS_CODE.CONFLICT)
    }
  })
})
