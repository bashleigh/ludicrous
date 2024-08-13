import { HttpMethod } from '../../types'
import { defineMethodMetadata } from './define.method.metadata'
import 'reflect-metadata'

/**
 * The PUT Method decorator. For defining PUT method HTTP requests.
 * 
 * @param path The route path for this method.
 * @returns 
 */
export const Put = (path?: string): MethodDecorator => defineMethodMetadata(HttpMethod.PUT, path)
