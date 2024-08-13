import { HttpMethod } from '../../types'
import { defineMethodMetadata } from './define.method.metadata'
import 'reflect-metadata'

/**
 * The POST Method decorator. For defining POST method HTTP requests.
 * 
 * @param path The route path for this method.
 * @returns 
 */
export const Post = (path?: string): MethodDecorator => defineMethodMetadata(HttpMethod.POST, path)
