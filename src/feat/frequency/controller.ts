import type { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Stat } from '~/model/Stat'
import { Pokemon } from '~/model/Pokemon'
import { PokemonToType } from '~/model/PokemonToType'
import type { GenerationQuery } from '~/shared/interface'
import type { IndexParams } from './interface'

const getTypes = async (
  generation: GenerationQuery['generation'],
  category: 'PRIMARY' | 'SECONDARY',
): Promise<any[]> => {
  let typeQuery = getRepository(PokemonToType)
    .createQueryBuilder('pokemonType')
    .select(['type.name'])
    .addSelect('COUNT(pokemonType.id)', 'count')
    .leftJoin('pokemonType.type', 'type')
    .leftJoin('pokemonType.pokemon', 'pokemon')
    .where('pokemonType.category = :category', {
      category,
    })
    .groupBy('type.name')
    .orderBy('count', 'DESC')

  if (generation !== 'all') {
    typeQuery = typeQuery.andWhere('pokemon.generation = :generation', {
      generation,
    })
  }

  const result = await typeQuery.getRawMany()

  return result
}

const typeA = async (
  req: Request<any, any, any, GenerationQuery>,
  res: Response,
): Promise<any> => {
  const { generation } = req.query
  const result = await getTypes(generation, 'PRIMARY')

  return res.json({
    data: result.map((p) => ({
      type: p.type_name,
      count: parseInt(p.count),
    })),
  })
}

const typeB = async (
  req: Request<any, any, any, GenerationQuery>,
  res: Response,
): Promise<any> => {
  const { generation } = req.query
  const result = await getTypes(generation, 'SECONDARY')

  return res.json({
    data: result.map((p) => ({
      type: p.type_name,
      count: parseInt(p.count),
    })),
  })
}

const statAvgPerGeneration = async (
  req: Request<IndexParams, any, any>,
  res: Response,
): Promise<any> => {
  const { id } = req.params
  const pokemonPerGenCountQuery = getRepository(Pokemon)
    .createQueryBuilder('pokemon')
    .select(['generation'])
    .addSelect('COUNT(pokemon.generation)', 'count')
    .groupBy('pokemon.generation')
    .orderBy('pokemon.generation', 'ASC')
  const statPerGenTotalQuery = getRepository(Stat)
    .createQueryBuilder('stat')
    .select('pokemon.generation')
    .addSelect(`SUM(stat.${id})`, 'stat')
    .innerJoin('stat.pokemon', 'pokemon')
    .groupBy('pokemon.generation')
    .orderBy('pokemon.generation', 'ASC')

  const [pokemonPerGenCount, statPerGenTotal] = await Promise.all([
    pokemonPerGenCountQuery.getRawMany(),
    statPerGenTotalQuery.getRawMany(),
  ])

  const result = pokemonPerGenCount.map((p, i) => {
    const statTotal = statPerGenTotal[i].stat
    const statAverage = parseInt(statTotal) / parseInt(p.count)

    return {
      generation: p.generation,
      total: parseFloat(statAverage.toFixed(3)),
    }
  })

  return res.json({
    data: result,
  })
}

export default { statAvgPerGeneration, typeA, typeB }
