import type { Request, Response, NextFunction } from 'express'
import Joi from '@hapi/joi'
import { validate } from '~/lib/joi'

export default (keyName: string, source: 'params' | 'body' | 'query') => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const schema = Joi.object({
    [keyName]: Joi.string()
      .required()
      .lowercase()
      .valid(
        'power',
        'attack',
        'defend',
        'speed',
        'sp-attack',
        'sp-defend',
        'hp',
      ),
  })

  const result = validate(schema, req[source], source)

  req[source] = {
    ...req[source],
    ...result.value,
  }

  if (req[source][keyName] === 'sp-attack') {
    req[source][keyName] = 'spAttack'
  }

  if (req[source][keyName] === 'sp-defend') {
    req[source][keyName] = 'spDefend'
  }

  next()
}
