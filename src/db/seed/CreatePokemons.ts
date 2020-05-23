import 'module-alias/register'
import { Factory, Seeder } from 'typeorm-seeding'
import type { Connection } from 'typeorm'
import { Pokemon } from '~/model/Pokemon'
import data from '~/db/data/pokemon.json'

export default class CreatePokemons implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Pokemon)
      .values(data)
      .execute()
  }
}
