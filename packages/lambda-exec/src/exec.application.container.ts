import { AbstractApplicationContainer, constructor } from "@reapit-ludicrous/framework"
import { APIGatewayEvent } from "aws-lambda";
import { HANDLE } from "./decorators/handle";

export class ExecApplicationContainer extends AbstractApplicationContainer {
  private controllerToken?: string
  private method?: string

  addController(provider: constructor<any>, bootLogging: boolean = true) {
    this.add(provider)
    this.controllerToken = provider.prototype.name
    this.method = Reflect.getOwnMetadata(HANDLE, provider.prototype)
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
