import { Entity, ManyToOne, Column, PrimaryGeneratedColumn } from 'typeorm'
import { Pokemon } from '~/model/Pokemon'
import { Type } from '~/model/Type'

@Entity()
export class PokemonToType {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  pokemonId!: number

  @Column()
  typeId!: number

  @ManyToOne(() => Pokemon, (pokemon) => pokemon.pokemonToTypes)
  pokemon!: Pokemon

  @ManyToOne(() => Type, (type) => type.pokemonToTypes)
  type!: Type
}
