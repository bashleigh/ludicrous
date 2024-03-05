import { Provide } from '@reapit-ludicrous/framework'
import { APIGatewayEvent } from 'aws-lambda'

@Provide()
export class ProfilerProvider {
  private readonly requests: { event: Partial<APIGatewayEvent>; response?: Response }[] = []

  addEvent(event: Partial<APIGatewayEvent>) {
    if (!event.path?.includes('profiler')) this.requests.push({ event })
  }

  addResponse(path: string, response: any) {
    console.log('response', response)
    if (!path?.includes('profiler')) this.requests[this.requests.length - 1].response = response
  }

  getRequests() {
    return this.requests
  }
}
