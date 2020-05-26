import { Router } from 'express'
import { wrapAsync } from '~/util'
import controller from './controller'
import generationValidation from '~/shared/middleware/generationValidation'

const router = Router()

router.get('/a', generationValidation(), wrapAsync(controller.typeA))
router.get('/b', generationValidation(), wrapAsync(controller.typeB))

export default router
