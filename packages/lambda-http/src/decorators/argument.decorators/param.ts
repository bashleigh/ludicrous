import { PARAMETER } from '../../constants'
import { defineArgumentMetadata } from './define.argument.metadata'

/**
 * Param Decorator. Used to obtain a URL parameter from the incoming request
 * 
 * @param name The parameter name, defined within the Controller or Method decorator
 * @returns 
 */
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
