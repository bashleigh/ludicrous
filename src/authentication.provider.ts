import { Provide } from './decorators'

@Provide()
export class AuthenticationProvider {
  authenticate(requestContext: Request): boolean {
    const header = requestContext.headers.get('authentication')

    // TODO verify authentication header with reapit package

    return false
  }
}
