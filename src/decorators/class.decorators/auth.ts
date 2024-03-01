import { AUTHENTICATE } from '../../constants'

export type ReapitRoles = '' | string

// TODO perhaps add an optional array of roles?
export const Auth =
  (roles?: ReapitRoles[]): ClassDecorator | MethodDecorator =>
  (target, propertyKey, descriptor) =>
    Reflect.defineMetadata(AUTHENTICATE, { roles }, target)
