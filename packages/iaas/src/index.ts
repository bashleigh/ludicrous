enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
}

type LambdaConfiguration = {
  gatewayPath: string,
  filePath: string,
  exportedHandlerName: string,
  gatewayMethod: HttpMethod,
}

export interface MultipleLambdaConfigInterface {
  applicationType: 'multiple',
  lambdas: LambdaConfiguration[],
}

export interface SingularLambdaConfigInterface {
  applicationType: 'singular',
  lambdaEntryFile: string,
  exportedHandlerName: string,
}

export interface IaaSDomainConifgInterface {
  type: 'sub' | 'namespace'
}

export interface IaasDynamodbConfigInterface {
  tableName?: string // doubt we could use named strings, will likely have to be auto generated
}

export type IaaSConfigInterface = {
  domain?: IaaSDomainConifgInterface,
  dyanmodb?: IaasDynamodbConfigInterface,
} & (MultipleLambdaConfigInterface | SingularLambdaConfigInterface)

export const iaasConfig = (config: IaaSConfigInterface) => {

}
