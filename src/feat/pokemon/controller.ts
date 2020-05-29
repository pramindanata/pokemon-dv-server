import type { Request, Response } from 'express'
import { FindManyOptions } from 'typeorm'
import { Pokemon } from '~/model/Pokemon'
import { ILIKE } from '~/lib/typeorm'
import { HttpException } from '~/lib/http'
import type { IndexQuery, ShowParams } from './interface'
import { transformIndex, transformShow } from './util'

const index = async (
  req: Request<any, any, any, IndexQuery>,
  res: Response,
): Promise<any> => {
  const { query } = req
  const options: FindManyOptions<Pokemon> = {
    select: ['id', 'name', 'image', 'index', 'stringIndex'],
    take: query.limit,
    relations: ['pokemonToTypes', 'pokemonToTypes.type'],
    where: {},
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
  const total: number = await req.ctx.repo.pokemon.count({
    where: options.where,
  })

  return res.json({
    data: transformIndex(pokemons),
    total,
  })
}

const show = async (req: Request<ShowParams>, res: Response): Promise<any> => {
  const { id } = req.params
  const pokemon = await req.ctx.repo.pokemon.findOne(
    {
      stringIndex: id,
    },
    {
      relations: ['stat', 'pokemonToTypes', 'pokemonToTypes.type'],
    },
  )

  if (!pokemon) {
    throw new HttpException('Data not found', 404)
  }

  return res.json({
    data: transformShow(pokemon),
  })
}

export default {
  index,
  show,
}
