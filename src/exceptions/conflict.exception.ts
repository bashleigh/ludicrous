import { HttpException } from './http.exception'
import { HTTP_RESPONSE } from './http.response.code'

export class ConflictException extends HttpException {
  httpRespsonse = HTTP_RESPONSE.CONFLICT
}
