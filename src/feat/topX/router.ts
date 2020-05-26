import { Router } from 'express'
import { wrapAsync } from '~/util'
import statKeyValidation from '~/shared/middleware/statKeyValidation'
import generationValidation from '~/shared/middleware/generationValidation'
import controller from './controller'

const router = Router()

router.get(
  '/:id',
  statKeyValidation('id', 'params'),
  generationValidation(),
  wrapAsync(controller.index),
)

export default router
