import { Pokemon } from '~/model/Pokemon'
import type { PokemonResource } from './interface'

export const transformIndex = (pokemons: Pokemon[]): PokemonResource[] => {
  return pokemons.map((pokemon) => ({
    id: pokemon.id,
    index: pokemon.index,
    name: pokemon.name,
    image: pokemon.image,
    type: pokemon.pokemonToTypes.map((junction) => ({
      name: junction.type.name,
      category: junction.category,
    })),
  }))
}
