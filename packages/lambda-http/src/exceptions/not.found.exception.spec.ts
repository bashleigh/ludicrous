import { HttpException } from './http.exception'
import { HTTP_STATUS_CODE } from './http.response.code'
import { NotFoundException } from './not.found.exception'

describe('NotFoundException', () => {
  it('Can throw and catch BadRequestException', () => {
    try {
      throw new NotFoundException()
      expect(true).toBeFalsy()
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error).toBeInstanceOf(NotFoundException)
      expect((error as HttpException).httpCode).toBe(HTTP_STATUS_CODE.NOT_FOUND)
    }
  })
})
