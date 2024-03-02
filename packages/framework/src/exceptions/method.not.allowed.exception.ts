import { HttpException } from './http.exception'
import { HTTP_RESPONSE } from './http.response.code'

export class MethodNotAllowedException extends HttpException {
  httpRespsonse = HTTP_RESPONSE.METHOD_NOT_ALLOWED
}
