import { BODY } from '../../constants'
import { defineArgumentMetadata } from './define.argument.metadata'

export const Body =
  (parseJson: boolean = true): ParameterDecorator =>
  (target, propertyKey, propertyIndex) =>
    defineArgumentMetadata({
      target,
      method: propertyKey,
      propertyIndex,
      type: BODY,
      options: { parseJson },
    })
