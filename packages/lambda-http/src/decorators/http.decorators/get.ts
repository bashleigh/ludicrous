import { HttpMethod } from '../../types'
import { defineMethodMetadata } from './define.method.metadata'
import 'reflect-metadata'

/**
 * The GET Method decorator. For defining GET method HTTP requests.
 * 
 * @param path The route path for this method.
 * @returns 
 */
export const Get = (path?: string): MethodDecorator => defineMethodMetadata(HttpMethod.GET, path)
