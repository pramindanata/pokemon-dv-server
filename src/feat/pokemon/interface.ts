export interface PokemonTypeResource {
  name: string
  category: 'PRIMARY' | 'SECONDARY'
}

export interface PokemonResource {
  id: number
  index: number
  name: string
  image: string
  type: PokemonTypeResource[]
}

export interface IndexParams {
  lastId?: string
  search?: string
  orderBy: 'name' | 'index'
  sortBy: 'ASC' | 'DESC'
  limit: number
}
