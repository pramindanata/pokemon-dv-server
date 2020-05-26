import type { Request, Response } from 'express'
// import { HttpException } from '~/lib/http'
import { getRepository } from 'typeorm'
import { Pokemon } from '~/model/Pokemon'
import { GenerationQuery } from '~/shared/interface'

import { transformTop10, transformTop3 } from './util'
import type { IndexParams } from './interface'

const index = async (
  req: Request<IndexParams, any, any, GenerationQuery>,
  res: Response,
): Promise<any> => {
  const { generation } = req.query
  const { id } = req.params

  let top10Query = getRepository(Pokemon)
    .createQueryBuilder('pokemon')
    .select(['pokemon.id', 'pokemon.name', 'pokemon.index', `stat.${id}`])
    .innerJoin('pokemon.stat', 'stat')
    .orderBy(`stat.${id}`, 'DESC')
    .take(10)

  let top3Query = getRepository(Pokemon)
    .createQueryBuilder('pokemon')
    .select([
      'pokemon.id',
      'pokemon.name',
      'pokemon.index',
      'pokemon.image',
      `stat.${id}`,
    ])
    .innerJoin('pokemon.stat', 'stat')
    .leftJoinAndSelect('pokemon.pokemonToTypes', 'pokemonToTypes')
    .innerJoinAndSelect('pokemonToTypes.type', 'type')
    .orderBy(`stat.${id}`, 'DESC')
    .take(3)

  if (generation !== 'all') {
    top10Query = top10Query.where('pokemon.generation = :generation', {
      generation,
    })

    top3Query = top3Query.where('pokemon.generation = :generation', {
      generation,
    })
  }

  return res.json({
    top10: transformTop10(await top10Query.getMany(), id),
    top3: transformTop3(await top3Query.getMany(), id),
  })
}

export default { index }
