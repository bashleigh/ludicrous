import { HttpMethod } from '../../types'
import { defineMethodMetadata } from './define.method.metadata'

export const Delete = (path?: string): MethodDecorator => defineMethodMetadata(path, HttpMethod.DELETE)
