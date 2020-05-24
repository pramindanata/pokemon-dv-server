import 'module-alias/register'
import { Factory, Seeder } from 'typeorm-seeding'
import type { Connection } from 'typeorm'
import { PokemonToType } from '~/model/PokemonToType'
import data from '~/db/data/pokemonToType.json'

export default class CreatePokemonToTypes implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const values = data as PokemonToType[]

    await connection
      .createQueryBuilder()
      .insert()
      .into(PokemonToType)
      .values(values)
      .execute()
  }
}
