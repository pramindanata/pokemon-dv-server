import 'module-alias/register'
import { Factory, Seeder } from 'typeorm-seeding'
import type { Connection } from 'typeorm'
import { Stat } from '~/model/Stat'
import data from '~/db/data/stat.json'

export default class CreateStats implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Stat)
      .values(data)
      .execute()
  }
}
