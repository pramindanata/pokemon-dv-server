import type { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { PokemonToType } from '~/model/PokemonToType'
import type { GenerationQuery } from './interface'

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

export default { typeA, typeB }
