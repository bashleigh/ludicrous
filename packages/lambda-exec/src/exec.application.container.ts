import { AbstractApplicationContainer, constructor } from '@reapit-ludicrous/framework'
import { APIGatewayEvent } from 'aws-lambda'
import { HANDLE } from './decorators/handle'

export class ExecApplicationContainer extends AbstractApplicationContainer {
  private controllerToken?: string
  private method?: string

  addController(provider: constructor<any>, bootLogging: boolean = true) {
    this.add(provider)
    this.controllerToken = provider.name
    this.method = Reflect.getOwnMetadata(HANDLE, provider.prototype)

    if (this.method === undefined)
      throw new Error(
        "Given controller doesn't have a defined handle method. Please add the Handle decorator to your controller's entry point",
      )

    bootLogging && console.log(`Application booted with [${this.controllerToken}].${this.method}`)
  }

  handle(event: APIGatewayEvent) {
    const controller = this.get<any>(this.controllerToken as string)

    try {
      return controller[this?.method as string](event)
    } catch (error) {
      console.error(error)
    }
  }
}
