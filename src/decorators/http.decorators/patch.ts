import { HttpMethod } from '../../types'
import { defineMethodMetadata } from './define.method.metadata'
import 'reflect-metadata'

export const Patch = (path?: string): MethodDecorator => defineMethodMetadata(path, HttpMethod.PATCH)
