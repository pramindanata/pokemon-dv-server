import type { Request, Response } from 'express'
// import { HttpException } from '~/lib/http'
import { getRepository } from 'typeorm'
import { Pokemon } from '~/model/Pokemon'

import { transformTop10, transformTop3 } from './util'
import type { StatType, Query } from './interface'

const handler = async (
  req: Request<any, any, any, Query>,
  res: Response,
  key: StatType,
): Promise<any> => {
  const { generation } = req.query

  let top10Query = getRepository(Pokemon)
    .createQueryBuilder('pokemon')
    .select(['pokemon.id', 'pokemon.name', 'pokemon.index', `stat.${key}`])
    .innerJoin('pokemon.stat', 'stat')
    .orderBy(`stat.${key}`, 'DESC')
    .take(10)

  let top3Query = getRepository(Pokemon)
    .createQueryBuilder('pokemon')
    .select([
      'pokemon.id',
      'pokemon.name',
      'pokemon.index',
      'pokemon.image',
      `stat.${key}`,
    ])
    .innerJoin('pokemon.stat', 'stat')
    .leftJoinAndSelect('pokemon.pokemonToTypes', 'pokemonToTypes')
    .innerJoinAndSelect('pokemonToTypes.type', 'type')
    .orderBy(`stat.${key}`, 'DESC')
    .take(3)

  if (generation !== 'all') {
    top10Query = top10Query.where('pokemon.generation = :generation', {
      generation,
    })

    top3Query = top3Query.where('pokemon.generation = :generation', {
      generation,
    })
  }

  return res.json({
    top10: transformTop10(await top10Query.getMany(), key),
    top3: transformTop3(await top3Query.getMany(), key),
  })
}

const power = async (
  req: Request<any, any, any, Query>,
  res: Response,
): Promise<any> => {
  return handler(req, res, 'power')
}

const hp = async (
  req: Request<any, any, any, Query>,
  res: Response,
): Promise<any> => {
  return handler(req, res, 'hp')
}

const attack = async (
  req: Request<any, any, any, Query>,
  res: Response,
): Promise<any> => {
  return handler(req, res, 'attack')
}

const defend = async (
  req: Request<any, any, any, Query>,
  res: Response,
): Promise<any> => {
  return handler(req, res, 'defend')
}

const spAttack = async (
  req: Request<any, any, any, Query>,
  res: Response,
): Promise<any> => {
  return handler(req, res, 'spAttack')
}

const spDefend = async (
  req: Request<any, any, any, Query>,
  res: Response,
): Promise<any> => {
  return handler(req, res, 'spDefend')
}

const speed = async (
  req: Request<any, any, any, Query>,
  res: Response,
): Promise<any> => {
  return handler(req, res, 'speed')
}

export default { power, hp, attack, defend, spAttack, spDefend, speed }
