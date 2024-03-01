import { IDENTITY } from '../../constants'
import { defineArgumentMetadata } from './define.argument.metadata'

export const Identity = (): ParameterDecorator => (target, propertyKey, propertyIndex) =>
  defineArgumentMetadata({
    target,
    method: propertyKey,
    propertyIndex,
    type: IDENTITY,
  })
