require('dotenv').config()

const env = process.env

module.exports = {
  type: 'postgres',
  host: env.DB_HOST || 'localhost',
  port: env.DB_PORT || 5432,
  username: env.DB_USERNAME || 'postgres',
  password: env.DB_PASSWORD || '',
  database: env.DB_NAME || 'pokemon-dv',
  logging: ['error'],
  synchronize: true,
  entities: ['dist/model/*.js'],
}
