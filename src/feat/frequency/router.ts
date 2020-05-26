import { Router } from 'express'
import { wrapAsync } from '~/util'
import controller from './controller'
import generationValidation from '~/shared/middleware/generationValidation'

const router = Router()

router.get('/type-a', generationValidation(), wrapAsync(controller.typeA))
router.get('/type-b', generationValidation(), wrapAsync(controller.typeB))

export default router
