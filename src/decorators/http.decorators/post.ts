import { HttpMethod } from '../../types'
import { defineMethodMetadata } from './define.method.metadata'
import 'reflect-metadata'

export const Post = (path?: string): MethodDecorator => defineMethodMetadata(HttpMethod.POST, path)
