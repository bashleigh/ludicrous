import { HttpException } from './http.exception'
import { HTTP_RESPONSE } from './http.response.code'

export class UnprocessableContentException extends HttpException {
  httpRespsonse = HTTP_RESPONSE.UNPROCESSABLE_CONTENT
}
