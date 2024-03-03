import { PARAMETER } from '../../constants'
import { defineArgumentMetadata } from './define.argument.metadata'

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
