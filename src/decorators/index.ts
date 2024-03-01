import 'reflect-metadata'
import {
  AUTHENTICATE,
  BODY,
  CONTROLLER,
  HEADER,
  IDENTITY,
  INJECTABLES,
  METHOD,
  PARAMETER,
  PATH,
  PROVIDER,
  QUERY,
} from '../constants'

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

export const Controller =
  (path?: string): ClassDecorator =>
  (target) =>
    injectify(target, CONTROLLER, { path })

export const Provide = (): ClassDecorator => (target) => injectify(target, PROVIDER)

export type ReapitRoles = '' | string

// TODO perhaps add an optional array of roles?
export const Auth =
  (roles?: ReapitRoles[]): ClassDecorator | MethodDecorator =>
  (target, propertyKey, descriptor) =>
    Reflect.defineMetadata(AUTHENTICATE, { roles }, target)

const defineMethod =
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

export const Get = (path?: string): MethodDecorator => defineMethod(path, 'get')

export const Post = (path?: string): MethodDecorator => defineMethod(path, 'post')

export const Put = (path?: string): MethodDecorator => defineMethod(path, 'put')

export const Delete = (path?: string): MethodDecorator => defineMethod(path, 'delete')

export const Patch = (path?: string): MethodDecorator => defineMethod(path, 'patch')

export const Header =
  (key: string): ParameterDecorator =>
  (target, propertyKey) => {
    Reflect.defineMetadata(HEADER, { key }, target) // TODO this all need to be arrayable
  }

export interface ArgumentMetadata {
  name?: string
  type: 'QUERY' | 'PARAMETER' | 'BODY' | 'IDENTITY'
  method: string | symbol | undefined
  propertyIndex: number
  target: Object
}

const defineArgumentMetadata = ({ name, type, method, propertyIndex, target }: ArgumentMetadata) => {
  Reflect.defineMetadata(
    `${PARAMETER}::${method?.toString()}`,
    [
      ...(Reflect.getMetadata(`${PARAMETER}::${method?.toString()}`, target) || []),
      { type, name, method: method, propertyIndex },
    ].sort((a, b) => a.propertyIndex - b.propertyIndex),
    target,
  )
}

export const Param =
  (name: string): ParameterDecorator =>
  (target, propertyKey, propertyIndex) =>
    defineArgumentMetadata({
      name,
      target,
      method: propertyKey,
      propertyIndex,
      type: PARAMETER,
    })

export const Query =
  (name: string): ParameterDecorator =>
  (target, propertyKey, propertyIndex) =>
    defineArgumentMetadata({
      name,
      target,
      method: propertyKey,
      propertyIndex,
      type: QUERY,
    })

export const Body = (): ParameterDecorator => (target, propertyKey, propertyIndex) =>
  defineArgumentMetadata({
    target,
    method: propertyKey,
    propertyIndex,
    type: BODY,
  })

export const Identity = (): ParameterDecorator => (target, propertyKey, propertyIndex) =>
  defineArgumentMetadata({
    target,
    method: propertyKey,
    propertyIndex,
    type: IDENTITY,
  })
