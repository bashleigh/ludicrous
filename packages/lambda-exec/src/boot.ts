import { Provider, constructor } from "@reapit-ludicrous/framework"
import { ExecApplicationContainer } from "./exec.application.container"

export class Boot {
  static application({providers, controller }: {
    providers: Provider[],
    controller: constructor<any>,
  }, { bootLogging = false }: {
    bootLogging: boolean
  }) {
    const application = new ExecApplicationContainer()
    providers.forEach(provider => application.add(provider))

    application.addController(controller, bootLogging)

    return application
  }
}
