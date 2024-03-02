import { HttpException } from './http.exception'
import { HTTP_RESPONSE } from './http.response.code'

export class NotFoundException extends HttpException {
  httpRespsonse = HTTP_RESPONSE.NOT_FOUND

  constructor(message?: string) {
    super(message || 'Not Found')
  }
}
