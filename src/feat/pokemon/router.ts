import { Router } from 'express'
import { wrapAsync } from '~/util'
import controller from './controller'

const router = Router()

router.get('/', wrapAsync(controller.index))

export default router
