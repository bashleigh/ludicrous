import { HttpException } from './http.exception'
import { HTTP_STATUS_CODE } from './http.response.code'
import { UnprocessableContentException } from './unprocessable.content.exception'

describe('UnprocessableContentException', () => {
  it('Can throw and catch BadRequestException', () => {
    try {
      throw new UnprocessableContentException()
      expect(true).toBeFalsy()
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error).toBeInstanceOf(UnprocessableContentException)
      expect((error as HttpException).httpCode).toBe(HTTP_STATUS_CODE.UNPROCESSABLE_CONTENT)
    }
  })
})