import { Router } from 'express'
import { wrapAsync } from '~/util'
import controller from './controller'

const router = Router()

router.get('/type-a', wrapAsync(controller.typeA))
router.get('/type-b', wrapAsync(controller.typeB))
router.get('/generation', wrapAsync(controller.generation))

export default router
