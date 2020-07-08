import moduleAlias from 'module-alias'
import 'reflect-metadata'
import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { createConnection } from 'typeorm'

dotenv.config()
moduleAlias.addAlias('~', __dirname)

import config from '~/config'
import setupContext from '~/shared/middleware/setupContext'
import errorHandler from '~/shared/middleware/errorHandler'
import { init } from '~/lib/repository'
import routes from '~/feat'

const app = express()
const port = config.app.port

createConnection()
  .then((con) => {
    const repository = init(con)
    const logger = morgan(
      ':method :url :status :res[content-length] - :response-time ms',
    )

    app.use(logger)
    app.use(bodyParser.json())
    app.use(setupContext(repository))
    app.use('/static', express.static(config.app.publicPath))

    app.get('/', (req, res) => {
      return res.json({
        msg: 'Hello there',
      })
    })

    app.use(routes)
    app.use(errorHandler())

    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })
