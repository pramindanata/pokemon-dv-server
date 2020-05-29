import type { Request, Response, NextFunction } from 'express'
import Joi from '@hapi/joi'
import { validate } from '~/lib/joi'

export default () => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const schema = Joi.object({
    generation: Joi.string()
      .valid('1', '2', '3', '4', '5', '6', 'all')
      .default('all'),
  })

  const result = validate(schema, req.query, 'query')

  req.query = {
    ...req.query,
    ...result.value,
  }

  next()
}
