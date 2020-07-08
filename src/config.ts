import path from 'path'

const env = process.env

export default {
  app: {
    port: env.APP_PORT || 4000,
    publicPath: path.join(__dirname, '../', '/dist/public'),
  },
}
