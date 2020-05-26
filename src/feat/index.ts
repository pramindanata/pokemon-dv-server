import { Router } from 'express'
import pokemon from '~/feat/pokemon/router'
import top from '~/feat/topX/router'
import proportion from '~/feat/proportion/router'
import frequency from '~/feat/frequency/router'
import stat from '~/feat/stat/router'

const router = Router()

router.use('/pokemon', pokemon)
router.use('/top', top)
router.use('/proportion', proportion)
router.use('/frequency', frequency)
router.use('/stat', stat)

export default router
