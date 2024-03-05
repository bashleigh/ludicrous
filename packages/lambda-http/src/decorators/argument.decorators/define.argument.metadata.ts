import { ARGUMENT } from '../../constants'
import 'reflect-metadata'

export interface ArgumentMetadata {
  name?: string
  type: 'QUERY' | 'PARAMETER' | 'BODY' | 'IDENTITY' | 'HEADER'
  method: string | symbol | undefined
  propertyIndex: number
  target: Object
  options?: any
}

export const defineArgumentMetadata = ({ name, type, method, propertyIndex, target, options }: ArgumentMetadata) => {
  Reflect.defineMetadata(
    `${ARGUMENT}::${method?.toString()}`,
    [
      ...(Reflect.getMetadata(`${ARGUMENT}::${method?.toString()}`, target) || []),
      { type, name, method: method, propertyIndex, options },
    ].sort((a, b) => a.propertyIndex - b.propertyIndex),
    target,
  )
}
