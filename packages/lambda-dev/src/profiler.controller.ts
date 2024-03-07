import { Controller, Get, RouteMetadataContainer } from '@reapit-ludicrous/lambda-http'
import { ProfilerProvider } from './profiler.provider'

@Controller('api/profiler')
export class ProfilerController {
  constructor(
    private readonly requestProfiler: ProfilerProvider,
    private readonly routeMetadataProvider: RouteMetadataContainer,
  ) {}

  @Get('')
  getEvents() {
    return this.requestProfiler.getRequests()
  }

  @Get('routes')
  getRoutes() {
    return this.routeMetadataProvider.getAll()
  }
}
