import type { Request, Response, NextFunction } from 'express'
import Joi from '@hapi/joi'
import { validate } from '~/lib/joi'

export default () => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const schema = Joi.object({
    lastId: Joi.number(),
    search: Joi.string(),
    limit: Joi.number().max(16).default(16),
    orderBy: Joi.string().lowercase().valid('name', 'index').default('name'),
    sortBy: Joi.string().lowercase().valid('asc', 'desc').default('desc'),
  })

  validate(schema, req.query, 'query')

  next()
}
