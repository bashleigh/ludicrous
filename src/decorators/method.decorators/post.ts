import { HttpMethod } from '../../types'
import { defineMethodMetadata } from './define.method.metadata'

export const Post = (path?: string): MethodDecorator => defineMethodMetadata(path, HttpMethod.POST)
