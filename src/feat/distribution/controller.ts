import type { Request, Response } from 'express'
import { getRepository } from 'typeorm'
// import { HttpException } from '~/lib/http'
import type { GenerationQuery } from '~/shared/interface'
import { Type } from '~/model/Type'
import { Stat } from '~/model/Stat'

import type { IndexParams } from './interface'

const statPerType = async (
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
    .orderBy('type.id')

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

const legendaryVNon = async (
  req: Request<IndexParams, any, any, GenerationQuery>,
  res: Response,
): Promise<any> => {
  const { id } = req.params
  const { generation } = req.query

  let legendaryQuery = getRepository(Stat)
    .createQueryBuilder('stat')
    .select(`stat.${id}`, 'stat')
    .innerJoin('stat.pokemon', 'pokemon')
    .where('pokemon.legendary = :legendary', {
      legendary: true,
    })
  let nonQuery = getRepository(Stat)
    .createQueryBuilder('stat')
    .select(`stat.${id}`, 'stat')
    .innerJoin('stat.pokemon', 'pokemon')
    .where('pokemon.legendary = :legendary', {
      legendary: false,
    })

  if (generation !== 'all') {
    legendaryQuery = legendaryQuery.andWhere(
      'pokemon.generation = :generation',
      {
        generation,
      },
    )
    nonQuery = nonQuery.andWhere('pokemon.generation = :generation', {
      generation,
    })
  }

  const legendary = await legendaryQuery.getRawMany()
  const non = await nonQuery.getRawMany()

  return res.json({
    data: {
      legendary: legendary.map((s) => s.stat),
      nonLegendary: non.map((s) => s.stat),
    },
  })
}

export default { statPerType, legendaryVNon }
