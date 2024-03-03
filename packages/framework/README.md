# Ludicrous Framework 

A tiny TypeScript container for resolving classes and their dependencies.

## Getting Started

### Install

```bash
$ yarn add @reapit-ludicrous/framework
```

### Extending the ApplicationContainer

```ts
import { AbstractApplicationContainer } from '@reapit-ludicrous/framework'

class MyApplicationContainer extends AbstractApplicationContainer {
  handle() {
    // Do something 
  }
}

const application = new MyApplicationContainer()

application.add({
  token: 'my-token',
  useValue: 'anything',
})

const provider = application.get('my-token')

console.log('provider', provider) // provider, 'anything'
```


