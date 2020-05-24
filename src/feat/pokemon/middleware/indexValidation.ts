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
    sortBy: Joi.string().uppercase().valid('ASC', 'DESC').default('DESC'),
  })

  const result = validate(schema, req.query, 'query')

  req.query = {
    ...req.query,
    ...result.value,
  }

  next()
}
