import type { Pokemon } from '~/model/Pokemon'
import type { StatType } from './interface'

export const transformTop10 = (pokemons: Pokemon[], type: StatType): any => {
  return pokemons.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    index: pokemon.index,
    stat: pokemon.stat[type],
  }))
}

export const transformTop3 = (pokemons: Pokemon[], type: StatType): any => {
  return pokemons.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    index: pokemon.index,
    image: pokemon.image,
    stat: pokemon.stat[type],
    type: pokemon.pokemonToTypes.map((j) => ({
      name: j.type.name,
      category: j.category,
    })),
  }))
}
