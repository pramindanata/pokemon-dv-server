import { Router } from 'express'
import { wrapAsync } from '~/util'
import controller from './controller'
import queryValidation from './middleware/queryValidation'

const router = Router()

router.get('/power', queryValidation(), wrapAsync(controller.power))
router.get('/hp', queryValidation(), wrapAsync(controller.hp))
router.get('/attack', queryValidation(), wrapAsync(controller.attack))
router.get('/defend', queryValidation(), wrapAsync(controller.defend))
router.get('/spAttack', queryValidation(), wrapAsync(controller.power))
router.get('/spDefend', queryValidation(), wrapAsync(controller.spDefend))
router.get('/speed', queryValidation(), wrapAsync(controller.speed))

export default router
