import { QUERY } from '../../constants'
import { defineArgumentMetadata } from './define.argument.metadata'

/**
 * Query Decorator. Used to obtain a query parameter from the incoming request
 * 
 * @param name The parameter key name
 * @returns 
 */
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
