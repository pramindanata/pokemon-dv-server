import type { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Stat } from '~/model/Stat'
import { Pokemon } from '~/model/Pokemon'
import type { GenerationQuery } from '~/shared/interface'
import type { IndexParams } from './interface'

const statType = async (
  req: Request<IndexParams, any, any, GenerationQuery>,
  res: Response,
): Promise<any> => {
  const { generation } = req.query
  const { id } = req.params
  let statQuery = getRepository(Stat)
    .createQueryBuilder('stat')
    .select(`stat.${id}`, 'stat')
    .innerJoin('stat.pokemon', 'pokemon')

  if (generation !== 'all') {
    statQuery = statQuery.where('pokemon.generation = :generation', {
      generation,
    })
  }

  const result = await statQuery.getRawMany()

  return res.json({
    data: result.map((s) => s.stat),
    total: result.length,
  })
}

const generationAvg = async (
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

export default { statType, generationAvg }
