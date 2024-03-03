import { HttpMethod } from '../../types'
import { defineMethodMetadata } from './define.method.metadata'
import 'reflect-metadata'

export const Put = (path?: string): MethodDecorator => defineMethodMetadata(HttpMethod.PUT, path)
