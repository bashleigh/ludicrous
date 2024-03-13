import { Intent } from '@reapit/elements'

export const methodToIntent = (method: string): Intent => {
  switch (method) {
    case 'GET':
      return 'primary'
    case 'POST':
      return 'success'
    case 'PUT':
    case 'PATCH':
      return 'low'
    case 'DELETE':
      return 'danger'
    default:
      return 'default'
  }
}

export const statusCodeToIntent = (statusCode: number): Intent => {
  if (statusCode >= 200 && statusCode <= 299) return 'success'
  else if (statusCode >= 300 && statusCode <= 399) return 'primary'
  else if (statusCode >= 400 && statusCode <= 499) return 'warning'
  else if (statusCode >= 500 && statusCode <= 599) return 'danger'
  return 'default'
}
