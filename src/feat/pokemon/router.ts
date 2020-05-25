import { Router } from 'express'
import { wrapAsync } from '~/util'
import controller from './controller'
import indexValidation from './middleware/indexValidation'
import showValidation from './middleware/showValidation'

const router = Router()

router.get('/', indexValidation(), wrapAsync(controller.index))
router.get('/:id', showValidation(), wrapAsync(controller.show))

export default router
