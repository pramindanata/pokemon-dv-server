import type { Request, Response, NextFunction } from 'express'
import { HttpException } from '~/lib/http'
import { ValidationException } from '~/lib/joi'

export default () => (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  if (err instanceof HttpException) {
    return res.status(err.getStatus()).json(err.createBody())
  } else if (err instanceof ValidationException) {
    return res.status(422).json(err.createBody())
  }

  next(err)
}
