import type { Request, Response, NextFunction } from 'express'

interface AsyncHandler {
  (req: Request, res: Response, next?: NextFunction): Promise<any>
}

/**
 * Async route handler Wrapper
 */
export const wrapAsync = (fn: AsyncHandler) => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  fn(req, res, next).catch((err: any) => next(err))
}
