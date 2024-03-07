# IaaS

IaaS deployment configuration package for lambda-http and lambda-exec.

We need to have a discussion around how we envision developers will be mocking the deployed environment on their local? The setup I've played with so far would be fine for lambdas with no actions or relations to other resources. 
If our end goal is to enable the use of AWS resources then we need to consider how we envision replicating these resources locally? We could utilise localstack however this would mean generating a CDK template locally and using said template for localstack and IaaS deployment. Which would be possible because we'd be able to add roles to the deploying lambda to prevent misuse of the CDK template deploying method. 

However we may change how IaaS works entirely and decide on using step functions and or code pipeline? So we really need to decide how the backend infrastructure will opperate and how we can mock that locally? So far I think localstack will be required to emulate AWS resources such as SQS, SNS, STS, SES, dynamodb, RDS and others that we may require to use? This would be based on our own Reapit developer's requirements such as my own.

Another option may be we enable a locally run proxy to proxy IaaS resources to be used locally? However this may mean we need to consider cost and implications of this action and the environments request/issue.

## Getting started

### Install

```bash
$ yarn add --dev @reapit-ludicrous/iaas
```

### Deploy

#### Singular proxy application
```ts
import { iaasConifg } from '@reapit-ludicrous/iaas'

export default iaasConfig({
  applicationType: 'singular',
  lambdaEntryFile: 'src/index.ts',
  exportedHandlerName: 'handler',
})
```

#### Multiple applications setup

```ts
import { iaasConifg } from '@reapit-ludicrous/iaas'

export default iaasConfig({
  applicationType: 'multiple',
  lambdas: [
    {
      gatewayPath: 'my-path/:id',
      filePath: 'src/my-path.ts',
      exportedHandlerName: 'handler',
      gatewayMethod: 'GET',
    },
  ],
})
```

#### Dynamo DB

Need to consider how the parameters for the connection could be automatically added to the envrionment and parameters of the application.

```ts
import { iaasConifg } from '@reapit-ludicrous/iaas'

export default iaasConfig({
  applicationType: 'singular',
  lambdaEntryFile: 'src/index.ts',
  exportedHandlerName: 'handler',
  dynamodb: {

  }
})
```
