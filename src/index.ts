import 'module-alias/register'
import 'reflect-metadata'
import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { createConnection } from 'typeorm'

dotenv.config()

import config from '~/config'
import setupContext from '~/shared/middleware/setupContext'
import { init } from '~/lib/repository'

const app = express()
const port = config.app.port

createConnection()
  .then((con) => {
    const repository = init(con)

    app.use(
      morgan(':method :url :status :res[content-length] - :response-time ms'),
    )
    app.use(bodyParser.json())
    app.use(setupContext(repository))

    app.get('/', (req, res) => {
      return res.json({
        msg: 'Hello there',
      })
    })

    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })
