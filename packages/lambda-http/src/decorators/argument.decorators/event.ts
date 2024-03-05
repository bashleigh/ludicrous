import { EVENT } from "../../constants"
import { defineArgumentMetadata } from "./define.argument.metadata"

export const Event = (): ParameterDecorator =>
(target, propertyKey, propertyIndex) =>
  defineArgumentMetadata({
    name: 'event',
    target,
    method: propertyKey,
    propertyIndex,
    type: EVENT,
  })
