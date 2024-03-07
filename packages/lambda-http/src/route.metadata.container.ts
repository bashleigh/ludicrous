import { Match, MatchFunction, MatchResult, match, pathToRegexp } from 'path-to-regexp'
import { AbstractMetadataContainer, constructor } from '@reapit-ludicrous/framework'
import { CONTROLLER, PATH } from './constants'

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

  addRoute(
    metadata: Omit<Omit<Omit<Omit<RouteMetadata, 'token'>, 'controllerMetadata'>, 'pathReg'>, 'match'> & {
      provider: constructor<any>
    },
  ) {
    const controllerMetadata = Reflect.getMetadata(CONTROLLER, metadata.provider)
    const pathMetadata = Reflect.getOwnMetadata(PATH, metadata.provider.prototype[metadata.method])
    const fullPath = [controllerMetadata.path.replace(/^\//g, ''), pathMetadata]
      .filter((part) => part !== undefined && part !== '' && part !== '/')
      .join('/')
      .replace(/\/\//g, '/')

    this.bootLogging &&
      console.log(
        `Resolving ${metadata.httpMethod.toUpperCase()} ${fullPath} => ${metadata.controllerToken}.${metadata.method.toString()}`,
      )
    super.add({
      ...metadata,
      token: `${metadata.httpMethod.toString()}-${fullPath}`,
      controllerMetadata,
      match: match(fullPath),
      pathReg: pathToRegexp(fullPath),
    })
  }

  getAll() {
    return this.metadata
  }
}
