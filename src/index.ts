import 'module-alias/register'
import 'reflect-metadata'
import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { createConnections } from 'typeorm'

dotenv.config()

import config from '~/config'

const app = express()
const port = config.app.port

createConnections()
  .then(() => {
    app.use(
      morgan(':method :url :status :res[content-length] - :response-time ms'),
    )
    app.use(bodyParser.json())

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