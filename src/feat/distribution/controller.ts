import type { Request, Response } from 'express'
import { getRepository } from 'typeorm'
// import { HttpException } from '~/lib/http'
import type { GenerationQuery } from '~/shared/interface'
import { Type } from '~/model/Type'

import type { IndexParams } from './interface'

const index = async (
  req: Request<IndexParams, any, any, GenerationQuery>,
  res: Response,
): Promise<any> => {
  const { id } = req.params
  const { generation } = req.query
  let typeQuery = getRepository(Type)
    .createQueryBuilder('type')
    .select(['type.name'])
    .addSelect(`stat.${id}`, 'stat')
    .innerJoin('type.pokemonToTypes', 'pokemonToTypes')
    .innerJoin('pokemonToTypes.pokemon', 'pokemon')
    .innerJoin('pokemon.stat', 'stat')
    .orderBy('stat')

  if (generation !== 'all') {
    typeQuery = typeQuery.where('pokemon.generation = :generation', {
      generation,
    })
  }

  const resultAsDict = (await typeQuery.getRawMany()).reduce((p, c) => {
    if (!p[c.type_name]) {
      p[c.type_name] = []
    }

    p[c.type_name].push(c.stat)

    return p
  }, {})

  const resultAsArr = Object.keys(resultAsDict).map((k) => ({
    type: k,
    values: resultAsDict[k],
  }))

  return res.json({
    data: resultAsArr,
  })
}

export default { index }
