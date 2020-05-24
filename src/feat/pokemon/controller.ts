import type { Request, Response } from 'express'
import { FindManyOptions } from 'typeorm'
import { Pokemon } from '~/model/Pokemon'
import { ILIKE } from '~/lib/typeorm'
import type { IndexParams } from './interface'
import { transformIndex } from './util'

const index = async (
  req: Request<any, any, any, IndexParams>,
  res: Response,
): Promise<any> => {
  const { query } = req
  const options: FindManyOptions<Pokemon> = {
    select: ['id', 'name', 'image', 'index'],
    take: query.limit,
    relations: ['pokemonToTypes', 'pokemonToTypes.type'],
    order: {
      [query.orderBy]: query.sortBy,
    },
    skip: (query.page - 1) * query.limit,
  }

  if (query.search) {
    options.where = {
      name: ILIKE(`%${query.search}%`),
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
