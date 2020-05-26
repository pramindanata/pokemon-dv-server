import { Router } from 'express'
import { wrapAsync } from '~/util'
import controller from './controller'
import generationValidation from '~/shared/middleware/generationValidation'

const router = Router()

router.get('/power', generationValidation(), wrapAsync(controller.power))
router.get('/hp', generationValidation(), wrapAsync(controller.hp))
router.get('/attack', generationValidation(), wrapAsync(controller.attack))
router.get('/defend', generationValidation(), wrapAsync(controller.defend))
router.get('/spAttack', generationValidation(), wrapAsync(controller.power))
router.get('/spDefend', generationValidation(), wrapAsync(controller.spDefend))
router.get('/speed', generationValidation(), wrapAsync(controller.speed))

export default router
