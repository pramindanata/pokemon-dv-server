import { Router } from 'express'
import { wrapAsync } from '~/util'
import generationValidation from '~/shared/middleware/generationValidation'
import controller from './controller'
import paramValidation from './middleware/paramValidation'

const router = Router()

router.get(
  '/generation-average/:id',
  paramValidation(),
  wrapAsync(controller.generationAvg),
)

router.get(
  '/:id',
  paramValidation(),
  generationValidation(),
  wrapAsync(controller.statType),
)

export default router
