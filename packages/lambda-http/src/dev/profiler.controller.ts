import { Controller, Get } from '../decorators'
import { ProfilerProvider } from './profiler.provider'

@Controller('profiler')
export class ProfilerController {
  constructor(private readonly requestProfiler: ProfilerProvider) {}
  @Get()
  getEvents() {
    return this.requestProfiler.getRequests()
  }
}
