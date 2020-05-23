import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { PokemonToType } from '~/model/PokemonToType'

@Entity()
export class Type {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @OneToMany(() => PokemonToType, (pokemonToType) => pokemonToType.type)
  pokemonToTypes!: PokemonToType[]
}
