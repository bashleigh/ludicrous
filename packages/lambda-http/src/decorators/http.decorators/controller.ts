import { CONTROLLER } from '../../constants'
import { defineClassMetadata } from '@reapit-ludicrous/framework'

type ControllerOptions = {
  /**
   * The description for this Controller. Used for documentation
   */
  description?: string
}

/**
 * Controller decorator, used for defining a route
 * @param path The route path of this controller
 * @param options Additional Controller Metadata options
 * @returns 
 */
export const Controller =
  (path?: string, options?: ControllerOptions): ClassDecorator =>
  (target) =>
    defineClassMetadata(target, CONTROLLER, { path, ...options })


