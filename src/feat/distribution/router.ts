import { Router } from 'express'
import { wrapAsync } from '~/util'
import controller from './controller'
import generationValidation from '~/shared/middleware/generationValidation'
import statKeyValidation from '~/shared/middleware/statKeyValidation'

const router = Router()

router.get(
  '/stat-per-type/:id',
  statKeyValidation('id', 'params'),
  generationValidation(),
  wrapAsync(controller.index),
)

export default router
