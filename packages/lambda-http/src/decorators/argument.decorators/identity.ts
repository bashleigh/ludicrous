import { IDENTITY } from '../../constants'
import { defineArgumentMetadata } from './define.argument.metadata'

/**
 * Obtain the identity of the user on the incoming request
 * 
 * @returns the identity of the user if any
 */
export const Identity = (): ParameterDecorator => (target, propertyKey, propertyIndex) =>
  defineArgumentMetadata({
    target,
    method: propertyKey,
    propertyIndex,
    type: IDENTITY,
  })
