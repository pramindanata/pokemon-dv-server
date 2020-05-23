import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm'
import { Stat } from '~/model/Stat'
import { PokemonToType } from '~/model/PokemonToType'

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

  @OneToMany(() => PokemonToType, (pokemonToType) => pokemonToType.pokemon)
  pokemonToTypes!: PokemonToType[]
}
