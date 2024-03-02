import { constructor } from './types'

export type ValueProvider = { token: string; useValue: any }
export type TokenProvider = { token: string; useClass: constructor<any> }
export type Provider = constructor<any> | ValueProvider | TokenProvider

export const isValueProvider = (provider: Provider): provider is ValueProvider =>
  provider.hasOwnProperty('token') && provider.hasOwnProperty('useValue')
export const isTokenProvider = (provider: Provider): provider is TokenProvider =>
  provider.hasOwnProperty('token') && provider.hasOwnProperty('useClass')
export const isConstructorProvider = (provider: Provider): provider is constructor<any> =>
  // @ts-ignore
  !!provider.prototype && !!provider.prototype.constructor.name