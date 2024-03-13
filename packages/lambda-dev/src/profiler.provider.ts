import { Provide, constructor } from '@reapit-ludicrous/framework'
import { RouteMetadata } from '@reapit-ludicrous/lambda-http'
import { APIGatewayEvent } from 'aws-lambda'

type Entry = {
  event: Partial<APIGatewayEvent>
  route?: RouteMetadata
  response?: Response
  executionTime?: string
  controller?: any
}

@Provide()
export class ProfilerProvider {
  private readonly requests: Entry[] = []

  addEvent(event: Partial<APIGatewayEvent>, route?: RouteMetadata, controller?: constructor<any>) {
    const entry: Entry = { event, route }

    if (route && controller) {
      const code = (controller as any)[route.method as string].toString()
      entry.controller = {
        code,
        controller: route.controllerToken,
        method: route.method,
      }
    }

    if (!event.path?.includes('profiler')) this.requests.push(entry)
  }

  addResponse(path: string, response: any, executionTime: string) {
    if (!path?.includes('profiler')) this.requests[this.requests.length - 1].response = response
    if (!path?.includes('profiler')) this.requests[this.requests.length - 1].executionTime = executionTime
  }

  getRequests() {
    return this.requests
  }
}
