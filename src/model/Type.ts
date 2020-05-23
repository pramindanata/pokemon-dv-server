import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'
import { Pokemon } from '~/model/Pokemon'

@Entity()
export class Type {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @ManyToMany(() => Pokemon, (pokemon) => pokemon.types)
  pokemons!: Pokemon[]
}
