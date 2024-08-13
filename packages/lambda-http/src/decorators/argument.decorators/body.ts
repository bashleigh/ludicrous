import { BODY } from '../../constants'
import { defineArgumentMetadata } from './define.argument.metadata'

/**
 * Decorator for obtaining the BODY from the incoming request
 * 
 * @param parseJson Boolean, for raw or parsed JSON. parsing JSON is default
 * @returns 
 */
export const Body =
  (parseJson: boolean = true): ParameterDecorator =>
  (target, propertyKey, propertyIndex) =>
    defineArgumentMetadata({
      target,
      method: propertyKey,
      propertyIndex,
      type: BODY,
      options: { parseJson },
    })
