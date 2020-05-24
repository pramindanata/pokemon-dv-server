import type { Request, Response } from 'express'
import { Pokemon } from '~/model/Pokemon'
import { transformIndex } from './util'

const index = async (req: Request, res: Response): Promise<any> => {
  const pokemons: Pokemon[] = await req.ctx.repo.pokemon.find({
    select: ['id', 'name', 'image', 'index'],
    take: 16,
    relations: ['pokemonToTypes', 'pokemonToTypes.type'],
  })

  return res.json({
    data: transformIndex(pokemons),
  })
}

export default {
  index,
}
