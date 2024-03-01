import { HttpMethod } from '../../types'
import { defineMethodMetadata } from './define.method.metadata'

export const Get = (path?: string): MethodDecorator => defineMethodMetadata(path, HttpMethod.GET)
