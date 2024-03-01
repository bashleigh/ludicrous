import { CONTROLLER, METHOD, PATH } from '../../constants'

export const defineMethodMetadata =
  (path: string = '/', method: string): MethodDecorator =>
  (target, propertyKey, descriptor) => {
    const controllerMetadata: { path: string } | undefined = Reflect.getMetadata(CONTROLLER, target.constructor)
    Reflect.defineMetadata(
      PATH,
      [controllerMetadata?.path, path].filter((path) => path !== undefined).join('/'),
      descriptor.value as any,
    )
    Reflect.defineMetadata(METHOD, method, descriptor.value as any)
  }
