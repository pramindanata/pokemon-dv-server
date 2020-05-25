import type { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Type } from '~/model/Type'
import { Pokemon } from '~/model/Pokemon'
import { transformType, transformGeneration, transformLegendary } from './util'

const typeA = async (req: Request, res: Response): Promise<any> => {
  const types = await getRepository(Type)
    .createQueryBuilder('type')
    .addSelect('COUNT(pokemonToTypes.id) as COUNT')
    .innerJoin('type.pokemonToTypes', 'pokemonToTypes')
    .where('pokemonToTypes.category = :category', {
      category: 'PRIMARY',
    })
    .groupBy('type.id')
    .getRawMany()

  return res.json({
    data: transformType(types),
    total: types.reduce((p, c) => p + parseInt(c.count), 0),
  })
}

const typeB = async (req: Request, res: Response): Promise<any> => {
  const totalPokemon = await req.ctx.repo.pokemon.count()
  const types = await getRepository(Type)
    .createQueryBuilder('type')
    .addSelect('COUNT(pokemonToTypes.id) as COUNT')
    .innerJoin('type.pokemonToTypes', 'pokemonToTypes')
    .where('pokemonToTypes.category = :category', {
      category: 'SECONDARY',
    })
    .groupBy('type.id')
    .getRawMany()

  types.push({
    type_id: null,
    type_name: 'None',
    count: totalPokemon - types.reduce((p, c) => p + parseInt(c.count), 0),
  })

  return res.json({
    data: transformType(types),
    total: totalPokemon,
  })
}

const generation = async (req: Request, res: Response): Promise<any> => {
  const generations = await getRepository(Pokemon)
    .createQueryBuilder('pokemon')
    .select('pokemon.generation')
    .addSelect('COUNT(pokemon.id)', 'count')
    .groupBy('pokemon.generation')
    .getRawMany()

  return res.json({
    data: transformGeneration(generations),
    total: generations.reduce((p, c) => p + parseInt(c.count), 0),
  })
}

const legendary = async (req: Request, res: Response): Promise<any> => {
  const proportions = await getRepository(Pokemon)
    .createQueryBuilder('pokemon')
    .select('pokemon.legendary')
    .addSelect('COUNT(pokemon.legendary)', 'count')
    .groupBy('pokemon.legendary')
    .getRawMany()

  return res.json({
    data: transformLegendary(proportions),
    total: proportions.reduce((p, c) => p + parseInt(c.count), 0),
  })
}

export default { typeA, typeB, generation, legendary }
