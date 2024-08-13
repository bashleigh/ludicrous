import { HttpMethod } from '../../types'
import { defineMethodMetadata } from './define.method.metadata'
import 'reflect-metadata'

/**
 * The PATCH Method decorator. For defining PATCH method HTTP requests.
 * 
 * @param path The route path for this method.
 * @returns 
 */
export const Patch = (path?: string): MethodDecorator => defineMethodMetadata(HttpMethod.PATCH, path)
