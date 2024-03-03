import { Provider } from './provider'

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

  get<R>(token: string): R | T | undefined {
    return this.metadata[token]
  }
}
