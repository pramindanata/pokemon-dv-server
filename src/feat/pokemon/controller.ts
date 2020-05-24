import type { Request, Response } from 'express'
import { FindManyOptions, FindConditions, LessThan, MoreThan } from 'typeorm'
import { Pokemon } from '~/model/Pokemon'
import { ILIKE } from '~/lib/typeorm'
import type { IndexParams } from './interface'
import { transformIndex } from './util'

const index = async (
  req: Request<any, any, any, IndexParams>,
  res: Response,
): Promise<any> => {
  const { query } = req
  let lastIdKey: any

  if (query.lastId) {
    const lastIdPokemon = await req.ctx.repo.pokemon.findOne({
      select: [query.orderBy],
      where: {
        id: query.lastId,
      },
    })

    lastIdKey = lastIdPokemon && lastIdPokemon[query.orderBy]
  }

  const options: FindManyOptions<Pokemon> = {
    select: ['id', 'name', 'image', 'index'],
    take: query.limit,
    relations: ['pokemonToTypes', 'pokemonToTypes.type'],
    order: {
      [query.orderBy]: query.sortBy,
    },
  }

  if (query.search) {
    options.where = {
      name: ILIKE(`%${query.search}%`),
    }
  }

  if (lastIdKey) {
    const sort = query.sortBy === 'ASC' ? MoreThan : LessThan

    options.where = {
      ...(options.where as FindConditions<Pokemon>),
      [query.orderBy]: sort(lastIdKey),
    }
  }

  const pokemons: Pokemon[] = await req.ctx.repo.pokemon.find(options)

  return res.json({
    data: transformIndex(pokemons),
  })
}

export default {
  index,
}
