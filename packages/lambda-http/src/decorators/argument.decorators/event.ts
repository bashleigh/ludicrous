import { EVENT } from '../../constants'
import { defineArgumentMetadata } from './define.argument.metadata'

/**
 * Event Decorator. Used for obtaining the event for the incoming AWS request.
 */
export const Event = (): ParameterDecorator => (target, propertyKey, propertyIndex) =>
  defineArgumentMetadata({
    name: 'event',
    target,
    method: propertyKey,
    propertyIndex,
    type: EVENT,
  })
