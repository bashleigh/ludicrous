import { Provider } from "./provider"

export interface ProviderMetadata {
  type: 'controller' | 'provider',
  token: string,
  provider: Provider,
}

abstract class AbstractMetadataContainer<T extends { token: string }> {
  constructor(
    protected readonly bootLogging: boolean = true,
  ) {}
  protected readonly metadata: { [s: string]: T } = {}

  add(metadata: T) {
    this.metadata[metadata.token] = metadata
  }

  get(token: string): T | undefined {
    return this.metadata[token]
  }
}

export class MetadataContainer extends AbstractMetadataContainer<ProviderMetadata> {
  getControllers() {
    return Object.values(this.metadata).filter(metadata => metadata.type === 'controller')
  }
}

export interface RouteMetadata {
  token: string, //path
  method: string | symbol,
  httpMethod: string,
  controllerToken: string,
  controllerMetadata: { path: string },
  pathReg: RegExp,
}

export class RouteMetadataContainer extends AbstractMetadataContainer<RouteMetadata> {
  resolvePathToRouteMetadata(path: string, method: string): RouteMetadata | undefined {
    return Object.values(this.metadata).find(metadata => {
      return metadata.httpMethod === method && metadata.pathReg.exec(path)
    })
  }

  add(metadata: RouteMetadata) {
    this.bootLogging && console.log(`Resolving ${metadata.httpMethod.toUpperCase()} ${metadata.token} => ${metadata.controllerToken}.${metadata.method.toString()}`)
    super.add(metadata)
  }
}
