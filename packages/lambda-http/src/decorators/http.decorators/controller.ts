import { CONTROLLER } from '../../constants'
import { defineClassMetadata } from '@reapit-ludicrous/framework'

export const Controller =
  (path?: string): ClassDecorator =>
  (target) =>
    defineClassMetadata(target, CONTROLLER, { path })
