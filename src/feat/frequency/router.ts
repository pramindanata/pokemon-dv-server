import { Router } from 'express'
import { wrapAsync } from '~/util'
import statKeyValidation from '~/shared/middleware/statKeyValidation'
import generationValidation from '~/shared/middleware/generationValidation'
import controller from './controller'

const router = Router()

router.get('/type/a', generationValidation(), wrapAsync(controller.typeA))
router.get('/type/b', generationValidation(), wrapAsync(controller.typeB))

router.get(
  '/stat-avg-per-generation/:id',
  statKeyValidation('id', 'params'),
  wrapAsync(controller.statAvgPerGeneration),
)

export default router
