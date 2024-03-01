import { Provider } from './provider'
import { Match, MatchFunction, MatchResult } from 'path-to-regexp'

export interface ProviderMetadata {
  type: 'controller' | 'provider'
  token: string
  provider: Provider
}

abstract class AbstractMetadataContainer<T extends { token: string }> {
  constructor(protected readonly bootLogging: boolean = true) {}
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
    return Object.values(this.metadata).filter((metadata) => metadata.type === 'controller')
  }
}

export interface RouteMetadata {
  token: string //path
  method: string | symbol
  httpMethod: string
  controllerToken: string
  controllerMetadata: { path: string }
  pathReg: RegExp
  match: MatchFunction
}

export class RouteMetadataContainer extends AbstractMetadataContainer<RouteMetadata> {
  resolvePathToRouteMetadata(path: string, method: string): (RouteMetadata & { match: MatchResult<any> }) | undefined {
    let match: Match | false = false

    const metadata = Object.values(this.metadata).find((metadata) => {
      match = metadata.match(path)
      return metadata.httpMethod === method && match
    })

    return metadata && match
      ? {
          ...metadata,
          match,
        }
      : undefined
  }

  add(metadata: RouteMetadata) {
    this.bootLogging &&
      console.log(
        `Resolving ${metadata.httpMethod.toUpperCase()} ${metadata.token} => ${metadata.controllerToken}.${metadata.method.toString()}`,
      )
    super.add(metadata)
  }
}
