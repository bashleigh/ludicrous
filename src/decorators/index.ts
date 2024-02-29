import 'reflect-metadata'
import { AUTHENTICATE, CONTROLLER, HEADER, INJECTABLES, METHOD, PARAMETER, PATH, PROVIDER } from '../constants'

const injectify = (target: Function, key: string, options?: {}) => {
  const prototype = target.prototype

  const parameters = Reflect.getMetadata('design:paramtypes', prototype.constructor)

  Reflect.defineMetadata(key, options, target)

  if (parameters) {
    const paramTokens = parameters.map((param: any, index: number) => {
      const injectInfo = Reflect.getMetadata(`param::${index}`, target)
      const customToken = injectInfo?.token
      const injectToken = customToken || param.name

      return {
        injectToken,
        typeName: param.name,
      }
    })

    Reflect.defineMetadata(INJECTABLES, paramTokens, target)
  }
}

export const Controller = (path?: string): ClassDecorator => (target) => injectify(target, CONTROLLER, { path })

export const Provide = (): ClassDecorator => (target) => injectify(target, PROVIDER)

export type ReapitRoles = '' | string

// TODO perhaps add an optional array of roles?
export const Auth = (roles?: ReapitRoles[]): ClassDecorator | MethodDecorator => (target, propertyKey, descriptor) => Reflect.defineMetadata(AUTHENTICATE, { roles }, target)

const defineMethod = (path: string = '/', method: string): MethodDecorator => (target, propertyKey, descriptor) => {
  const controllerMetadata: { path: string } | undefined = Reflect.getMetadata(CONTROLLER, target.constructor)
  Reflect.defineMetadata(PATH, [controllerMetadata?.path, path].filter(path => path !== undefined).join('/'), descriptor.value as any)
  Reflect.defineMetadata(METHOD, method, descriptor.value as any)
}

export const Get = (path?: string): MethodDecorator => defineMethod(path, 'get')

export const Post = (path?: string): MethodDecorator => defineMethod(path, 'post')

export const Put = (path?: string): MethodDecorator => defineMethod(path, 'put')

export const Delete = (path?: string): MethodDecorator => defineMethod(path, 'delete')

export const Patch = (path?: string): MethodDecorator => defineMethod(path, 'patch')

export const Header = (key: string): PropertyDecorator => (target, propertyKey) => {
  Reflect.defineMetadata(HEADER, { key }, target) // TODO this all need to be arrayable
}

export const Param = (parameter: string): PropertyDecorator => (target, propertyKey) => {
  Reflect.defineMetadata(PARAMETER, { parameter }, target) // TODO this all need to be arrayable
}
