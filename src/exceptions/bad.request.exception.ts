import { HttpException } from './http.exception'
import { HTTP_RESPONSE } from './http.response.code'

export class BadRequestException extends HttpException {
  httpRespsonse = HTTP_RESPONSE.BAD_REQUEST
}
