import { HttpMethod } from '../../types'
import { defineMethodMetadata } from './define.method.metadata'

export const Put = (path?: string): MethodDecorator => defineMethodMetadata(path, HttpMethod.PUT)
