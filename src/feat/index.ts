import { Router } from 'express'
import pokemon from '~/feat/pokemon/router'
import top from '~/feat/topX/router'
import proportion from '~/feat/proportion/router'
import frequencyType from '~/feat/frequency-type/router'
import frequencyStat from '~/feat/frequency-stat/router'
import distribution from '~/feat/distribution/router'

const router = Router()

router.use('/pokemon', pokemon)
router.use('/top', top)
router.use('/proportion', proportion)
router.use('/frequency/type', frequencyType)
router.use('/frequency/stat', frequencyStat)
router.use('/distribution', distribution)

export default router
