import { Boot } from '../../lambda-http/src/boot'
import { Body, Controller, Post } from '../../lambda-http/src/decorators'
import { serve } from './serve'

@Controller('test')
class TestController {
  @Post()
  async body(@Body() body: any) {
    console.log('body', body)

    return { body: body }
  }
}

const application = Boot.application({
  providers: [TestController],
})

serve({ application })
