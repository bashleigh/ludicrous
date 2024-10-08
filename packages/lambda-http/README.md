# Ludicrous http Lambda

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdm1jOXh6cmNsbTRuY3k5dTlwcnpkZGR0eGNwcWp3OWs3OWU5N2dzdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/izspP6uMbMeti/giphy.gif" />

## Getting started

### Install

```bash
$ yarn add @reapit-ludicrous/framework @reapit-ludicrous/lambda-http
```

### Create your application

Below is an example of the minimum requirements for starting an application within a lambda

```ts
import { Boot } from '@reapit-ludicrous/lambda-http'

const application = Boot.application({
  providers: [],
})

export const lambda = application.handle

```

### Local development

Using the `serve` method on the application will start a dev server that you can request from your local machine. 

We recommend using `nodemon` to run your test file; this will ensure hot reloading of the server when provider metadata has changed

```ts
import { Boot, serve } from '@reapit-ludicrous/lambda-http'

const application = Boot.application({
  providers: [],
})

serve({
  application,
  port: 3000,
})
```

#### Profiler

When using the `serve` method. The profiler will be automatically added to your application. You can then hit the endpoint `/profiler` to get info about logged requests and their responses.

To diable the profiler on dev, use the following configuration 

```ts
const application = Boot.application({ providers: [] }, { profiler: false })
```

### Write your first Controller

Below is an example of how controllers are defined within the application 

```ts
import { Controller, Get } from '@reapit-ludicrous/lambda-http'

@Controller('ludicrous')
export class MyLudicrousController {
  @Get('speed')
  async getMethod() {
    return 'my example method'
  }
}
```

> This is now callable from `localhost:3000/ludicrous/speed`

### Adding controllers to the application

```ts

const application = Boot.application({
  providers: [MyLudicrousController],
})
```

### Controller Method Decorators

### Controller Argument HTTP Decorators

Available methods are 

```ts
import { Controller, Get, Post, Delete, Patch, Put } from '@reapit-ludicrous/lambda-http'

@Controller('my-controller')
export class TestController {
  @Get()
  getAll() {}

  @Post()
  create() {}

  @Put()
  update() {}

  @Patch()
  updatePartial() {}

  @Delete()
  delete() {}
}
```

#### Param

```ts
import { Controller, Get, Param } from '@reapit-ludicrous/lambda-http'

@Controller('my-controller')
export class TestController {
  @Get(':id')
  method(@Param('id') id: string) {
    
  }
}
```

This can then be populated when hitting `my-controller/my-id`

#### Query

```ts
import { Controller, Get, Query } from '@reapit-ludicrous/lambda-http'

@Controller('my-controller')
export class TestController {
  @Get(':id')
  method(@Query('id') id?: string) {
    
  }
}
```
This can then be populated when hitting `my-controller?id=my-id`

#### Body

Use the body parameter decorator to populate a given argument with the body of the request

```ts
import { Controller, Post, Body } from '@reapit-ludicrous/lambda-http'

@Controller('my-controller')
export class TestController {
  @Post()
  method(@Body() body: any) {
    
  }
}
```

### Dependency Injection

To use Dependency Injection you need to make sure all providers to be present within the application's container

```ts

@Provide()
export class MyProvider {}

@Controller('ludicrous')
export class MyLudicrousController {
  constructor(
    private readonly myProvider: MyProvider,
  ) {}
}

const application = Boot.application({
  providers: [MyLudicrousController, Provider],
})
```

#### Exception Handling

Ludicrous supplies some build in http exception which will be interpreted as http responses 

```ts
import { Controller, Get, Param, NotFoundException } from '@reapit-ludicrous/lambda-http'

@Controller('my-controller')
export class MyController {
  myDatabase = { someId: 'value' }

  @Get(':id')
  method(@Param('id') id: string) {
    if (!this.myDatabase[id]) throw new NotFoundException()
  }
}
```

Hitting the endpoint `/my-controller/nothing` will result in `404 Not Found` response

Available Exceptions are

```ts
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  MethodNotAllowedException,
  NotFoundException,
  UnauthorizedException,
  UnProcessableContentException,
} from '@reapit-ludicrous/lambda-http'
```

### Providers

A provider can be a class or object


#### Defining a value provider

A value provider is any value that is stored within the container using a token. The structure is as shown below

```ts
const myValueProvider: ValueProvider = {
  token: 'my-token',
  useValue: 'anything you want it to be',
}
```

This can then be injected into a provider or controller like so

```ts
import { Provide, Inject } from '@reapit-ludicrous/framework'

@Provide()
export class MyProvider {
  constructor(
    @Inject('my-token') private readonly myInjectedValue: string,
  ) {}
}
```

> Not that the `token` value from the ValueProvider object is passed to the `@Inject()` decorator

Objects and classes can also be used

```ts
import { Provide, Inject } from '@reapit-ludicrous/framework'
import { Boot } from '@reapit-ludicrous/lambda-http'

class MyExample {}

@Provide()
class MyProvider {
  constructor(
    @Inject('my-token')
    private readonly myObject: { storedValue: string },
    @Inject('my-example')
    private readonly myExample: MyExample,
  ) {}
}

const app = Boot.application({
  providers: [
    {
      token: 'my-object',
      useValue: {
        storedValue: 'value',
      },
    },
    {
      token: 'my-example',
      useValue: new MyExample(),
    },
    MyProvider,
  ],
})
```

## Development

### Build

```bash
$ yarn build
```

### Testing 

```bash
$ yarn test
```
