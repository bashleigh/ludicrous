export enum HTTP_RESPONSE {
  OK = 'OK',
  CREATED = 'CREATED',
  ACCEPTED = 'ACCEPTED',
  NO_CONTENT = 'NO_CONTENT',
  RESET_CONTENT = 'RESET_CONTENT',
  PARTIAL_CONTENT = 'PARTIAL_CONTENT',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  PAYMENT_REQUIRED = 'PAYMENT_REQUIRED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
  NOT_ACCEPTED = 'NOT_ACCEPTED',
  CONFLICT = 'CONFLICT',
  UNPROCESSABLE_CONTENT = 'UNPROCESSABLE_CONTENT',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export const HTTP_STATUS_CODE: {[key in HTTP_RESPONSE]: number } = {
  [HTTP_RESPONSE.OK]: 200,
  [HTTP_RESPONSE.CREATED]: 201,
  [HTTP_RESPONSE.ACCEPTED]: 202,
  [HTTP_RESPONSE.NO_CONTENT]: 204,
  [HTTP_RESPONSE.RESET_CONTENT]: 205,
  [HTTP_RESPONSE.PARTIAL_CONTENT]: 206,
  [HTTP_RESPONSE.BAD_REQUEST]: 400,
  [HTTP_RESPONSE.UNAUTHORIZED]: 401,
  [HTTP_RESPONSE.PAYMENT_REQUIRED]: 402,
  [HTTP_RESPONSE.FORBIDDEN]: 403,
  [HTTP_RESPONSE.NOT_FOUND]: 404,
  [HTTP_RESPONSE.METHOD_NOT_ALLOWED]: 405,
  [HTTP_RESPONSE.NOT_ACCEPTED]: 406,
  [HTTP_RESPONSE.CONFLICT]: 409,
  [HTTP_RESPONSE.UNPROCESSABLE_CONTENT]: 422,
  [HTTP_RESPONSE.INTERNAL_SERVER_ERROR]: 500,
}

export enum HTTP_METHOD {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
  OPTIONS,
}

export abstract class HttpException extends Error {
  abstract httpRespsonse?: HTTP_RESPONSE
  get httpCode(): number {
    return HTTP_STATUS_CODE[this.httpRespsonse || HTTP_RESPONSE.INTERNAL_SERVER_ERROR]
  }

  constructor(message?: string) {
    super(message || 'Server Error')
  }
}

export class BadRequestException extends HttpException {
  httpRespsonse = HTTP_RESPONSE.BAD_REQUEST
}

export class UnauthorizedException extends HttpException {
  httpRespsonse = HTTP_RESPONSE.UNAUTHORIZED
}

export class ForbiddenException extends HttpException {
  httpRespsonse = HTTP_RESPONSE.FORBIDDEN
}

export class NotFoundException extends HttpException {
  httpRespsonse = HTTP_RESPONSE.NOT_FOUND

  constructor(message?: string) {
    super(message || 'Not Found')
  }
}

export class MethodNotAllowedException extends HttpException {
  httpRespsonse = HTTP_RESPONSE.METHOD_NOT_ALLOWED
}

export class NotAcceptedException extends HttpException {
  httpRespsonse = HTTP_RESPONSE.NOT_ACCEPTED
}

export class ConflictException extends HttpException {
  httpRespsonse = HTTP_RESPONSE.CONFLICT
}

export class UnprocessableContentException extends HttpException {
  httpRespsonse = HTTP_RESPONSE.UNPROCESSABLE_CONTENT
}
