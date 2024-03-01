import { PROVIDER } from '../../constants'
import { defineClassMetadata } from './define.class.metadata'
import 'reflect-metadata'

export const Provide = (): ClassDecorator => (target) => defineClassMetadata(target, PROVIDER)
