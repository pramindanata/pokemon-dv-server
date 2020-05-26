import type { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Stat } from '~/model/Stat'
import type { GenerationQuery } from '~/shared/interface'
import type { IndexParams } from './interface'

const index = async (
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

export default { index }
