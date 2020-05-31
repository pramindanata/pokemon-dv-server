import { Pokemon } from '~/model/Pokemon'
import type { PokemonResource } from './interface'

export const transformIndex = (pokemons: Pokemon[]): PokemonResource[] => {
  return pokemons.map((pokemon) => ({
    id: pokemon.id,
    index: pokemon.index,
    stringIndex: pokemon.stringIndex,
    name: pokemon.name,
    image: pokemon.image,
    types: pokemon.pokemonToTypes.map((junction) => ({
      name: junction.type.name,
      category: junction.category,
    })),
  }))
}

export const transformShow = (pokemon: Pokemon): any => {
  return {
    id: pokemon.id,
    index: pokemon.index,
    name: pokemon.name,
    image: pokemon.image,
    generation: pokemon.generation,
    description: pokemon.description,
    types: pokemon.pokemonToTypes.map((junction) => ({
      name: junction.type.name,
      category: junction.category,
    })),
    stat: {
      power: pokemon.stat.power,
      hp: pokemon.stat.hp,
      attack: pokemon.stat.attack,
      defend: pokemon.stat.defend,
      spAttack: pokemon.stat.spAttack,
      spDefend: pokemon.stat.spDefend,
      speed: pokemon.stat.speed,
      pokemon: pokemon.stat.pokemon,
    },
  }
}
