# Ludicrous Cli

## Getting started

### Install

```bash
$ yarn add @reapit-ludicrous/cli @reapit-ludicrous/framework
```

## Usage

```ts
import { Command, Arg, Boot } from 'grievous'

@Command({
  name: 'test',
  description: 'My example command called test',
})
class TestCommand extends AbstractCommand {
  run(
    @Arg({
      name: 'arg1',
      description: 'testing arg1',
    })
    arg1: any,
  ) {
    console.log('arg1', arg1)
  }
}

const cli = new Boot()

cli.run({
  commandName: 'my-command-name',
  commands: [ TestCommand ],
})

```

call it like this

```bash
$ ts-node src/index.ts test --arg1 my-arg
```
> replace `ts-node src/index.ts` with a bin file or main file and you can use that

## Global help 

The commands and args decorators have strict properties for descriptions and names. These are used to generate help outputs automatically for all command or specific commands and or their children.

```bash
$ ts-node src/index.ts --help
```
The above will print out all help info about all commands within the container

```bash
$ ts-node src/index.ts my-command --help
```
The above will print out the help info about the specific `my-command` command and it's children if any

```bash
$ ts-node src/index.ts my-command child --help
```
The above will print out the help info for the specific `child` command within `my-command`

## Command Decorator

```ts
@Command({
  name: 'command-name' // the sub command name for this defined command
  description: 'My Command does this cool thing', // the description used for help of this particular command
  children: [], // An array of child commands for chaining such as command-name sub-command, sub-command's class with be defined here
})
```

## Arg Decorator
```ts
 @Arg({
  name: 'arg1', // The give name of the arg, used as --arg1 on the command line
  description: 'testing arg1', // The description of the arg, used for help output of this particular command
  type: 'string', // The type, not required, only used for boolean types
  required: false, // If required, throw an exception message to user and prevent calling
  default: 'test', // If provided, this will be inputed if --arg1 is not provided
  alias: 'a', // Shorthand name for the argument
})
```

## Boostrapping

You will need to provide all commands and desired injectable classes into the grievous.run func.

```ts
const cli = new Boot()

cli.run({
  commandName: 'my-command-name',
  providers: [
    MySharedProvider,
  ],
  commands: [
    TestCommand,
  ],
})
```

## Global config

The global config object can be obtained within the run function as it's injected into the instantiated command

```ts
@Command({
  name: 'myCommand',
  desciption: 'example of global config usage',
})
class MyCommand extends AbstractCommand {
  async run() {
    if (this.globalConfig.dev) this.writeLn('I am in dev mode')
  }
}
```

## Sub (children) commands

These are commands that are chainable from a given parent command

```ts

@Command({
  name: 'child',
  description: 'The child command',
})
class ChildCommand extends AbstractCommand {}

@Command({
  name: 'parent',
  description: 'The parent command',
  children: [ ChildCommand ],
})
class ParentCommand extends AbstractCommand {}

```
In order to call the child command, you can do so like this 

```bash
$ ts-node src/index.ts parent child
```

For the children to be found, they will need to be added to the commands property within the grievous.run function

```ts
cli.run({
  commandName: 'my-command-name',
  commands: [ ParentCommand, ChildCommand ],
})
```

## Providers 

Providers are classes or token based values that are sotred within the container and injected within commands

```ts
import { Provide } from '@reapit-ludicrous/framework'
import { Command } from '@reapit-ludicrous/cli'

@Provide()
class MyProvider {

}

@Command({
  name: 'mycommand',
  description: 'My Command exampling how to inject custom providers',
})
class MyCommand extends AbstractCommand {
  constructor(
    @Inject('GlobalConfig') globalConfig: GobalConfig,
    private readonly myProvider: MyProvider,
  ) {
    super(globalConfig)
  }
}

cli.run({
  commandName: 'my-command-name',
  providers: [ MyProvider ],
  commands: [ MyCommand ],
})

```

#### Using values as providers

```ts
cli.run({
  commandName: 'my-command-name',
  providers: [{
    token: 'my-custom-provider',
    value: {
      myStoredProperty: 'myStoredValue',
    },
  }],
  commands: [ MyCommand ],
})
```

Can then be injected within providers or commands

```ts
import { Provide, Inject } from '@reapit-ludicrous/framework'
import { Command } from '@reapit-ludicrous/cli'

@Provide()
class MyProvider {
  constructor(
    @Inject('my-custom-provider') private readonly customProvider: { myStoredProperty: sting },
  ) {}
}


@Command({
  name: 'mycommand',
  description: 'My Command exampling how to inject custom providers',
})
class MyCommand extends AbstractCommand {
  constructor(
    @Inject('GlobalConfig') globalConfig: GobalConfig,
    @Inject('my-custom-provider') private readonly customProvider: { myStoredProperty: sting },
  ) {
    super(globalConfig)
  }
}

```

