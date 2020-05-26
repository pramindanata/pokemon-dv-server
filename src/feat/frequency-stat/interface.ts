export type StatType =
  | 'power'
  | 'hp'
  | 'attack'
  | 'defend'
  | 'spAttack'
  | 'spDefend'
  | 'speed'

export interface IndexParams extends Record<string, any> {
  id: StatType
}
