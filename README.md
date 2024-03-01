# Reapit Ludicrous 

A tiny TypeScript http framework built specifically for lambda API gateway handling.

<iframe src="https://giphy.com/embed/izspP6uMbMeti" width="480" height="254" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/community-playstation-xo-izspP6uMbMeti">via GIPHY</a></p>

## Getting started

### Install

> Not yet available 

### Create your application

Below is an example of the minimum requirements for starting an application within a lambda

```ts
import { Boot } from '@reapit/ludicrous'

const application = Boot.application({
  providers: [],
})

export const lambda = application.handle

```

### Local development

Using the `serve` method on the application will start a dev server that you can request from your local machine. 

We recommend using `nodemon` to run your test file; this will ensure hot reloading of the server when provider metadata has changed

```ts
import { Boot } from '@reapit/ludicrous'

const application = Boot.application({
  providers: [],
})

application.serve(3000)
```

### Write your first Controller

Below is an example of how controllers are defined within the application 

```ts
import { Controller, Get } from '@reapit/ludicrous'


@Controller('ludicrous')
export class MyLudicrousController {
  @Get()
  async getMethod() {
    return 'my example method'
  }
}
```

### Adding controllers to the application

```ts

const application = Boot.application({
  providers: [MyLudicrousController],
})
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

