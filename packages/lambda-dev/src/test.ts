import { Body, Controller, Delete, Post, Boot, Param, Get, NotFoundException } from '@reapit-ludicrous/lambda-http'
import { serve } from './serve'

@Controller('test')
class TestController {
  @Post()
  async body(@Body() body: any) {
    console.log('body', body)

    return { body: body }
  }

  @Delete(':id')
  async delete(@Param('id') id: any) {
    return { id }
  }

  @Get()
  async get() {
    throw new NotFoundException()
  }
}

const application = Boot.application({
  providers: [TestController],
})

serve({ application })
