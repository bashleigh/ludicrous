import { Controller, Get } from '@reapit-ludicrous/lambda-http'
import { ProfilerProvider } from './profiler.provider'

@Controller('api/profiler')
export class ProfilerController {
  constructor(
    private readonly requestProfiler: ProfilerProvider,
  ) {}


  @Get('')
  getEvents() {
    return this.requestProfiler.getRequests()
  }
}
