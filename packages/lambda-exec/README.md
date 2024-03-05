# lambda-exec

A tiny TypeScript framework designed to make reusable defined classes for execution based lambdas

## Getting Started

### Install

```bash
$ yarn add @reapit-ludicrous/lambda-exec @reapit-ludicrous/framework
```

### Boot the application

```ts
import { Handle, Boot } from '@reapit-ludicrous/lambda-exec'

class Controller {
  @Handle()
  myHandler(event) {
    console.log('payload', event.Payload)
  }
}

const application = Boot.application({
  providers: [],
  controller: Controller,
})

export const handle = application.handle
```

### Dependency Injection


```ts
import { Handle, Boot } from '@reapit-ludicrous/lambda-exec'
import { Provide, Inject } from '@reapit-ludicrous/framework'

@Provide()
class Provider {
  constructor(
    @Inject('my-config')
    private readonly providerConfig: any,
  ) {}
}

class Controller {
  constructor(
    private readonly provider: Provider,
  ) {}

  @Handle()
  myHandler(event) {
    console.log('payload', event.Payload)
  }
}

const application = Boot.application({
  providers: [  // Put all dependencies of the controller here
    Provider,
    {
      'my-config',
      useValue: {
        myConfig: true,
      },
    },
  ],
  controller: Controller,
})
```
