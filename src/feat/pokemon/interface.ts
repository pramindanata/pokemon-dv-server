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

export interface IndexQuery {
  search?: string
  page: number
  orderBy: 'name' | 'index'
  sortBy: 'ASC' | 'DESC'
  limit: number
}

export interface ShowParams extends Record<string, any> {
  id: string
}
