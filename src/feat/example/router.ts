import { Router } from 'express'
import { wrapAsync } from '~/util'
import controller from './controller'
import reqValidation from './middleware/reqValidation'

const router = Router()

router.get('/', wrapAsync(controller.index))
router.get('/:id', reqValidation(), wrapAsync(controller.show))

export default router
