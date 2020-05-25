export interface Query {
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
