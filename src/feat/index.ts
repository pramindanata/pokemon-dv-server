import { Router } from 'express'
import pokemon from '~/feat/pokemon/router'

const router = Router()

router.use('/pokemon', pokemon)

export default router
