import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { Pokemon } from '~/model/Pokemon'

@Entity()
export class Stat {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  power!: number

  @Column()
  hp!: number

  @Column()
  attack!: number

  @Column()
  defend!: number

  @Column()
  spAttack!: number

  @Column()
  spDefend!: number

  @Column()
  speed!: number

  @OneToOne(() => Pokemon, (pokemon) => pokemon.stat)
  @JoinColumn()
  pokemon!: Pokemon
}
