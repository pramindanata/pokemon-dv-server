import type { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Type } from '~/model/Type'
// import { HttpException } from '~/lib/http'
// import type {} from './interface'
import { transformType } from './util'

const typeA = async (req: Request, res: Response): Promise<any> => {
  const types = await getRepository(Type)
    .createQueryBuilder('type')
    .addSelect('COUNT(pokemonToTypes.id) as COUNT')
    .innerJoin('type.pokemonToTypes', 'pokemonToTypes')
    .where('pokemonToTypes.category = :category', {
      category: 'PRIMARY',
    })
    .groupBy('type.id')
    .getRawMany()

  return res.json({
    data: transformType(types),
    total: types.reduce((p, c) => p + parseInt(c.count), 0),
  })
}

const typeB = async (req: Request, res: Response): Promise<any> => {
  const totalPokemon = await req.ctx.repo.pokemon.count()
  const types = await getRepository(Type)
    .createQueryBuilder('type')
    .addSelect('COUNT(pokemonToTypes.id) as COUNT')
    .leftJoin('type.pokemonToTypes', 'pokemonToTypes')
    .where('pokemonToTypes.category = :category', {
      category: 'SECONDARY',
    })
    .groupBy('type.id')
    .getRawMany()

  types.push({
    type_id: null,
    type_name: 'None',
    count: totalPokemon - types.reduce((p, c) => p + parseInt(c.count), 0),
  })

  return res.json({
    data: transformType(types),
    total: totalPokemon,
  })
}

export default { typeA, typeB }
