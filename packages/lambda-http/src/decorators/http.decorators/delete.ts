import { HttpMethod } from '../../types'
import { defineMethodMetadata } from './define.method.metadata'
import 'reflect-metadata'

/**
 * The DELETE Method decorator. For defining DELETE method HTTP requests.
 * 
 * @param path The route path for this method.
 * @returns 
 */
export const Delete = (path?: string): MethodDecorator => defineMethodMetadata(HttpMethod.DELETE, path)
