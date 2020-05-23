import type { Connection, Repository } from 'typeorm'

import { Pokemon } from '~/model/Pokemon'
import { Stat } from '~/model/Stat'
import { Type } from '~/model/Type'

export interface DBRepository {
  pokemon: Repository<Pokemon>
  stat: Repository<Stat>
  type: Repository<Type>
}

export function init(connection: Connection): DBRepository {
  const pokemon = connection.getRepository(Pokemon)
  const stat = connection.getRepository(Stat)
  const type = connection.getRepository(Type)

  return {
    pokemon,
    stat,
    type,
  }
}
