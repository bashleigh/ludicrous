import { HTTP_RESPONSE, HTTP_STATUS_CODE } from './http.response.code'

export abstract class HttpException extends Error {
  abstract httpRespsonse?: HTTP_RESPONSE

  get httpCode(): number {
    return HTTP_STATUS_CODE[this.httpRespsonse || HTTP_RESPONSE.INTERNAL_SERVER_ERROR]
  }

  constructor(message?: string) {
    super(message || 'Server Error')
  }
}
