import { Router } from 'express'
import { wrapAsync } from '~/util'
import controller from './controller'
import indexValidation from './middleware/indexValidation'

const router = Router()

router.get('/', indexValidation(), wrapAsync(controller.index))

export default router
