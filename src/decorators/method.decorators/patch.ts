import { HttpMethod } from '../../types'
import { defineMethodMetadata } from './define.method.metadata'

export const Patch = (path?: string): MethodDecorator => defineMethodMetadata(path, HttpMethod.PATCH)
