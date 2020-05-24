import { Entity, ManyToOne, Column, PrimaryGeneratedColumn } from 'typeorm'
import { Pokemon } from '~/model/Pokemon'
import { Type } from '~/model/Type'

export enum TypeCategory {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
}

@Entity()
export class PokemonToType {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  pokemonId!: number

  @Column()
  typeId!: number

  @Column({
    type: 'enum',
    enum: TypeCategory,
  })
  category!: TypeCategory

  @ManyToOne(() => Pokemon, (pokemon) => pokemon.pokemonToTypes)
  pokemon!: Pokemon

  @ManyToOne(() => Type, (type) => type.pokemonToTypes)
  type!: Type
}
