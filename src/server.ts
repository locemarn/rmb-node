import expressApp, { startExpressServer } from './infra/expressApp'
import dotenv from 'dotenv'
import config from './infra/configs'

dotenv.config()

const PORT = config.app.port

export const StartServer = async () => {
  await startExpressServer()
  expressApp.listen(PORT, () => console.info(`Server running on port: ${PORT}`))

  process.on('uncaughtException', (err) => {
    console.error('uncaughtException', err)
    process.exit(1)
  })

  process.on('unhandledRejection', (err) => {
    console.error('unhandledRejection', err)
    process.exit(1)
  })
}

StartServer()
  .then(() => {
    console.log('Server started')
  })
  .catch((err) => {
    console.error('Failed to start server:', err)
    process.exit(1)
  })
