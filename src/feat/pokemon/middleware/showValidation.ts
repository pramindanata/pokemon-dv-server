import type { Request, Response, NextFunction } from 'express'
import Joi from '@hapi/joi'
import { validate } from '~/lib/joi'

export default () => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const schema = Joi.object({
    id: Joi.number().required(),
  })

  console.log(req.params)

  const result = validate(schema, req.params, 'params')

  req.params = {
    ...req.params,
    ...result.value,
  }

  next()
}
