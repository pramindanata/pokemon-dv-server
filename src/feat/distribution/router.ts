import { Router } from 'express'
import { wrapAsync } from '~/util'
import controller from './controller'
import generationValidation from '~/shared/middleware/generationValidation'
import statKeyValidation from '~/shared/middleware/statKeyValidation'

const router = Router()

router.get(
  '/stat/:id',
  statKeyValidation('id', 'params'),
  generationValidation(),
  wrapAsync(controller.stat),
)

router.get(
  '/stat-per-type/:id',
  statKeyValidation('id', 'params'),
  generationValidation(),
  wrapAsync(controller.statPerType),
)

router.get(
  '/legendary-v-non/:id',
  statKeyValidation('id', 'params'),
  generationValidation(),
  wrapAsync(controller.legendaryVNon),
)

export default router
