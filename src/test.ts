import { Context } from "aws-lambda";
import { Boot } from "./boot";
import { Controller, Get, Provide } from "./decorators";

@Provide()
class MyProvider {
  test() {
    return 'hello, I am a response'
  }
}

@Controller('my-test')
class TestController {
  constructor(
    private readonly provider: MyProvider,
  ) {}

  @Get('test')
  async myMethod() {
    return this.provider.test()
  }

  @Get('withparams/:param/:id')
  async params() {
    return 'with parameters'
  }

  @Get('/another/')
  async another() {
    return 'another'
  }
}

@Controller('/cheese')
class AnotherController {
  constructor(
    private readonly provider: MyProvider,
  ) {}

  @Get()
  async myMethod() {
    return this.provider.test()
  }
}

const application = Boot.application({ 
  providers: [
    TestController,
    MyProvider,
    AnotherController,
  ],
})

application.serve(3000)

// export const handler = application.handle

// export const lambda = application.handle({
//   path: '/my-test/test',
//   httpMethod: 'GET',
// }, {} as Context, () => {})
