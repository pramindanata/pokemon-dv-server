import type { Request, Response, NextFunction } from 'express'
import Joi from '@hapi/joi'
import { validate } from '~/lib/joi'

export default () => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const schema = Joi.object({
    page: Joi.number().min(1).default(1),
    search: Joi.string(),
    limit: Joi.number().max(24).default(24),
    orderBy: Joi.string().lowercase().valid('name', 'index').default('name'),
    sortBy: Joi.string().uppercase().valid('ASC', 'DESC').default('ASC'),
  })

  const result = validate(schema, req.query, 'query')

  req.query = {
    ...req.query,
    ...result.value,
  }

  next()
}
