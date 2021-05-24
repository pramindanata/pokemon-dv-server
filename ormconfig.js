/* eslint-disable */
require('dotenv').config()
const moduleAlias = require('module-alias')
const path = require('path')

const env = process.env
const outputDir = env.NODE_ENV === 'development' ? '/src' : '/dist'
const fileExt = env.NODE_ENV === 'development' ? 'ts' : 'js'
const appPath = path.join(__dirname, outputDir)

moduleAlias.addAlias('~', appPath)

module.exports = {
  type: 'postgres',
  host: env.DB_HOST || 'localhost',
  port: env.DB_PORT || 5432,
  username: env.DB_USERNAME || 'postgres',
  password: env.DB_PASSWORD || '',
  database: env.DB_NAME || 'pokemon-dv',
  logging: ['error'],
  synchronize: true,
  entities: [path.join(appPath, `model/*.${fileExt}`)], 
  seeds: [path.join(appPath, `db/seed/*.${fileExt}`)],
}
