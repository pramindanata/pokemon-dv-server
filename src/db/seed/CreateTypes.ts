import 'module-alias/register'
import { Factory, Seeder } from 'typeorm-seeding'
import type { Connection } from 'typeorm'
import { Type } from '~/model/Type'
import data from '~/db/data/type.json'

export default class CreateTypes implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Type)
      .values(data)
      .execute()
  }
}
