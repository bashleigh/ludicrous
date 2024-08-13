import { HEADER } from '../../constants'
import { defineArgumentMetadata } from './define.argument.metadata'

/**
 * Header Decorator. Used to obtain a specific header using the header's key.
 * @param name The name of the header key
 * @returns any
 */
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
