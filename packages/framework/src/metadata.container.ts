import { Provider } from './provider'
import { Match, MatchFunction, MatchResult, match, pathToRegexp } from 'path-to-regexp'
import { CONTROLLER, PATH } from './constants'
import { constructor } from './types'

export interface ProviderMetadata {
  type: 'controller' | 'provider'
  token: string
  provider: Provider
}

export abstract class AbstractMetadataContainer<T extends { token: string }> {
  constructor(protected readonly bootLogging: boolean = true) {}
  protected readonly metadata: { [s: string]: T } = {}

  add(metadata: T) {
    this.metadata[metadata.token] = metadata
  }

  get(token: string): T | undefined {
    return this.metadata[token]
  }
}

// export class MetadataContainer extends AbstractMetadataContainer<ProviderMetadata> {
//   getControllers() {
//     return Object.values(this.metadata).filter((metadata) => metadata.type === 'controller')
//   }
// }
