import { HttpException } from './http.exception'
import { HTTP_RESPONSE } from './http.response.code'

export class UnauthorizedException extends HttpException {
  httpRespsonse = HTTP_RESPONSE.UNAUTHORIZED
}
