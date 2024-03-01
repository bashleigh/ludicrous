import { HEADER } from '../../constants'
import { defineArgumentMetadata } from './define.argument.metadata'

export const Header =
  (name: string): ParameterDecorator =>
  (target, propertyKey, propertyIndex) =>
    defineArgumentMetadata({
      name,
      target,
      method: propertyKey,
      propertyIndex,
      type: HEADER,
    })
