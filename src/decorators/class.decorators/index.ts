import { CONTROLLER, INJECTABLES, PROVIDER } from '../../constants'

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

export * from './auth'
