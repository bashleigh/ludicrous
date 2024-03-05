import { Provide } from '@reapit-ludicrous/framework'
import { RouteMetadata } from '@reapit-ludicrous/lambda-http';
import { APIGatewayEvent } from 'aws-lambda'

@Provide()
export class ProfilerProvider {
  private readonly requests: { event: Partial<APIGatewayEvent>; route?: RouteMetadata, response?: Response, executionTime?: string }[] = []

  addEvent(event: Partial<APIGatewayEvent>, route?: RouteMetadata) {
    if (!event.path?.includes('profiler')) this.requests.push({ event, route })
  }

  addResponse(path: string, response: any, executionTime: string) {
    console.log('response', response)
    if (!path?.includes('profiler')) this.requests[this.requests.length - 1].response = response
    if (!path?.includes('profiler')) this.requests[this.requests.length - 1].executionTime = executionTime
  }

  getRequests() {
    return this.requests
  }
}
