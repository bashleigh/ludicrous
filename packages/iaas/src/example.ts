import { HttpMethod, iaasConfig } from "."

iaasConfig({
  applicationType: 'multiple',
  lambdas: [
    {
      gatewayPath: '/organisations',
      filePath: '/organisations/index.ts',
      exportedHandlerName: 'handler',
      gatewayMethod: HttpMethod.GET,
      authenticated: true,
    },
    {
      gatewayPath: '/organisations',
      filePath: '/organisations/index.ts',
      exportedHandlerName: 'handler',
      gatewayMethod: HttpMethod.POST,
      authenticated: true,
    },
  ],
  dyanmodb: {
    tableName: 'Organisations',
  },
})
