import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { Stat } from '~/model/Stat'
import { Type } from '~/model/Type'

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  index!: number

  @Column({
    unique: true,
  })
  stringIndex!: string

  @Column()
  name!: string

  @Column()
  description!: string

  @Column()
  image!: string

  @Column()
  generation!: number

  @Column()
  legendary!: boolean

  @OneToOne(() => Stat, (stat) => stat.pokemon)
  stat!: Stat

  @ManyToMany(() => Type, (type) => type.pokemons)
  @JoinTable()
  types!: Type[]
}
