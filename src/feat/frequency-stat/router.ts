import { Router } from 'express'
import { wrapAsync } from '~/util'
import statKeyValidation from '~/shared/middleware/statKeyValidation'
import generationValidation from '~/shared/middleware/generationValidation'
import controller from './controller'

const router = Router()

router.get(
  '/generation-average/:id',
  statKeyValidation('id', 'params'),
  wrapAsync(controller.generationAvg),
)

router.get(
  '/:id',
  statKeyValidation('id', 'params'),
  generationValidation(),
  wrapAsync(controller.statType),
)

export default router
