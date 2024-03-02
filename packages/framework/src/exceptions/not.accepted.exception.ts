import { HttpException } from './http.exception'
import { HTTP_RESPONSE } from './http.response.code'

export class NotAcceptedException extends HttpException {
  httpRespsonse = HTTP_RESPONSE.NOT_ACCEPTED
}
