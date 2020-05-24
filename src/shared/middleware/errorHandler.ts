import type { Request, Response, NextFunction } from 'express'
import { HttpException } from '~/lib/http'

export default () => (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  if (err instanceof HttpException) {
    return res.status(err.getStatus()).json(err.createBody())
  }

  next(err)
}
