import { CONTROLLER } from '../../constants'
import { defineClassMetadata } from './define.class.metadata'

export const Controller =
  (path?: string): ClassDecorator =>
  (target) =>
    defineClassMetadata(target, CONTROLLER, { path })
