import { BODY } from '../../constants'
import { defineArgumentMetadata } from './define.argument.metadata'

export const Body = (): ParameterDecorator => (target, propertyKey, propertyIndex) =>
  defineArgumentMetadata({
    target,
    method: propertyKey,
    propertyIndex,
    type: BODY,
  })
