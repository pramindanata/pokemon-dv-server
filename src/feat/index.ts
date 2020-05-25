import { Router } from 'express'
import pokemon from '~/feat/pokemon/router'
import top from '~/feat/topX/router'
import proportion from '~/feat/proportion/router'

const router = Router()

router.use('/pokemon', pokemon)
router.use('/top', top)
router.use('/proportion', proportion)

export default router
