import { Router } from 'express'
import { wrapAsync } from '~/util'
import controller from './controller'
import generationValidation from '~/shared/middleware/generationValidation'

const router = Router()

router.get('/:id', generationValidation(), wrapAsync(controller.index))

export default router
