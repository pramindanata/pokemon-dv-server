import type { Request, Response } from 'express'
// import { HttpException } from '~/lib/http'
// import type {} from './interface'

const index = async (req: Request, res: Response): Promise<any> => {
  return res.send('hello')
}

const show = async (req: Request, res: Response): Promise<any> => {
  return res.send('hello')
}

export default { index, show }
