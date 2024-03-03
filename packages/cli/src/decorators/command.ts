import { constructor, defineClassMetadata } from '@reapit-ludicrous/framework'
import { AbstractCommand } from '../abstract.command'

export const COMMAND_OPTIONS = 'COMMAND_OPTIONS'

export interface CommandOptionsInterface {
  name: string
  description: string
  children?: constructor<AbstractCommand>[]
}

export const Command = (options: CommandOptionsInterface): ClassDecorator => (target) => defineClassMetadata(target, COMMAND_OPTIONS, options)

// export const Command =
//   (options: CommandOptionsInterface): ClassDecorator =>
//   (target) => {
//     const prototype = target.prototype

//     const parameters = Reflect.getMetadata('design:paramtypes', prototype.constructor)

//     Reflect.defineMetadata(COMMAND_OPTIONS, options, target)

//     if (parameters) {
//       const paramTokens = parameters.map((param: any, index: number) => {
//         const injectInfo = Reflect.getMetadata(`param::${index}`, target)
//         const customToken = injectInfo?.token
//         const injectToken = customToken || param.name

//         return {
//           injectToken,
//           typeName: param.name,
//         }
//       })

//       Reflect.defineMetadata(PARAM_TOKENS, paramTokens, target)
//     }
//   }
