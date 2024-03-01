import { Context } from 'aws-lambda'
import { Boot } from './boot'
import { Controller, Get, Param, Provide, Query } from './decorators'

@Provide()
class AnotherProvider {}

@Provide()
class MyProvider {
  constructor(private readonly another: AnotherProvider) {}
  test() {
    return 'hello, I am a response'
  }
}

@Controller('my-test')
class TestController {
  constructor(private readonly provider: MyProvider) {}

  @Get('test')
  async myMethod() {
    return this.provider.test()
  }

  @Get('withparams/:param/:id')
  async params(@Param('id') id: string, @Param('param') param: string) {
    return `with parameters [${id}] [${param}]`
  }

  @Get('moreparams/:param/:id/:test/:red')
  async moreParams(
    @Query('testingquery') query: string,
    @Param('test') test: string,
    @Param('red') red: string,
    @Param('id') id: string,
    @Param('param') param: string,
  ) {
    console.log({ param, id, test, red, query })
    return `with parameters [${id}] [${param}] [${test}]`
  }

  @Get('/another/')
  async another() {
    return 'another'
  }
}

@Controller('/cheese')
class AnotherController {
  constructor(private readonly provider: MyProvider) {}

  @Get()
  async myMethod() {
    return this.provider.test()
  }
}

const application = Boot.application({
  providers: [TestController, MyProvider, AnotherProvider, AnotherController],
})

application.serve(3000)

// export const handler = application.handle

// export const lambda = application.handle({
//   path: '/my-test/test',
//   httpMethod: 'GET',
// }, {} as Context, () => {})
