import 'reflect-metadata'

export const HANDLE = 'HANDLE'

export const Handle = (): MethodDecorator => (target, method) => Reflect.defineMetadata(HANDLE, method, target)
