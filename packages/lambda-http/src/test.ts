import { Boot } from './boot'
import { Body, Controller, Post } from './decorators'
import { serve } from './dev'

@Controller('test')
class TestController {
  @Post()
  async body(@Body() body: any) {
    console.log('body', body)

    return 'body'
  }
}

const application = Boot.application({
  providers: [TestController],
})

serve({ application })
