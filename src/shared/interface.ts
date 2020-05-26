import type { DBRepository } from '~/lib/repository'

export interface RequestContext {
  repo: DBRepository
  additional: {
    [key: string]: any
  }
}

export interface GenerationQuery {
  generation: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 'all'
}

export type StatType =
  | 'power'
  | 'hp'
  | 'attack'
  | 'defend'
  | 'spAttack'
  | 'spDefend'
  | 'speed'
