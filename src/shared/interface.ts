import type { DBRepository } from '~/lib/repository'

export interface RequestContext {
  repo: DBRepository
  additional: {
    [key: string]: any
  }
}
