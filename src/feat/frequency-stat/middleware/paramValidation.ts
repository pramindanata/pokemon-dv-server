import type { Request, Response, NextFunction } from 'express'
import Joi from '@hapi/joi'
import { validate } from '~/lib/joi'

export default () => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const schema = Joi.object({
    id: Joi.string()
      .required()
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

  const result = validate(schema, req.params, 'params')

  req.params = {
    ...req.params,
    ...result.value,
  }

  if (req.params.id === 'sp-attack') {
    req.params.id = 'spAttack'
  }

  if (req.params.id === 'sp-defend') {
    req.params.id = 'spDefend'
  }

  next()
}
