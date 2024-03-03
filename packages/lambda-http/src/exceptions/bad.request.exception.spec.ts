import { BadRequestException } from './bad.request.exception'
import { HttpException } from './http.exception'
import { HTTP_STATUS_CODE } from './http.response.code'

describe('BadRequestException', () => {
  it('Can throw and catch BadRequestException', () => {
    try {
      throw new BadRequestException()
      expect(true).toBeFalsy()
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error).toBeInstanceOf(BadRequestException)
      expect((error as HttpException).httpCode).toBe(HTTP_STATUS_CODE.BAD_REQUEST)
    }
  })
})
