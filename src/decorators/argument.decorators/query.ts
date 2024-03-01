import { QUERY } from '../../constants'
import { defineArgumentMetadata } from './define.argument.metadata'

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
