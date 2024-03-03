import { HttpException } from './http.exception'
import { HTTP_RESPONSE } from './http.response.code'

export class ForbiddenException extends HttpException {
  httpRespsonse = HTTP_RESPONSE.FORBIDDEN
}
