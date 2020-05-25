import { Router } from 'express'
import pokemon from '~/feat/pokemon/router'
import top from '~/feat/topX/router'

const router = Router()

router.use('/pokemon', pokemon)
router.use('/top', top)

export default router
