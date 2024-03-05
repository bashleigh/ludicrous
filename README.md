# Reapit Ludicrous 

A collection of tiny TypeScript frameworks built specifically for cli, Lambda and related handling.

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdm1jOXh6cmNsbTRuY3k5dTlwcnpkZGR0eGNwcWp3OWs3OWU5N2dzdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/izspP6uMbMeti/giphy.gif" />

## Packages

- <a href="packages/framework">Framework</a>
- <a href="packages/lambda-http">lambda-http</a>
- <a href="packages/cli">cli</a>
- <a href="packages/lambda-exec/">lambda-exec</a>

<a href="packages/framework"><h3>Framework</h3></a>

The `@reapit-ludicrous/framework` package is a small DI application container. Designed to store metadata about a series of given classes and resolve their instanced state when requested and cache their instance for future requests.

<a href="packages/lambda-http"><h3>Lambda-http</h3></a>

The `@reapit-ludicrous/lambda-http` package an extention of the `framework` package that also includes http handling specifically for lambda proxy api gateway requests. 
The package includes everything the framework package offers plus http-ness stuffs.

#### Http Controllers

```ts
import { Controller, Get } from '@reapit-ludicrous/lambda-http'

@Controller('my-controller')
class MyController {
  @Get('my-method')
  async myMethod() {}
}
```

#### Booting application

```ts
import { Boot } from '@reapit-ludicrous/lambda-http'

const application = Boot.application({
  providers: [MyController],
})
```

The above will now resolve routes `my-controller/my-method` to `MyController.myMethod()`

#### Http Decorators

```ts
import { Controller, Get, Param, Query } from '@reapit-ludicrous/lambda-http'

@Controller('things')
class MyController {
  @Get(':id')
  async myMethod(
    @Param('id') id: string,
    @Query('sort') sort?: string,
  ) {}
}
```
The above example will resolve the parameter within the path `things/12345` where `12345` is parameter named `id`. To the `id` property of the method. 
If a query string is present (`things/12345?sort=asc`) with a key of `sort` it will be provided to the `sort` property on the method.
