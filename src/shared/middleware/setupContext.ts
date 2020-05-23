import type { Request, Response, NextFunction } from 'express'
import { DBRepository } from '~/lib/repository'

export default (repository: DBRepository) => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  req.ctx = {
    repo: repository,
    additional: {},
  }

  next()
}
