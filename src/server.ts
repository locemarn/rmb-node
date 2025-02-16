import expressApp from './infra/expressApp'
import dotenv from 'dotenv'
import config from './config'

dotenv.config()

const PORT = config.app.port

export const StartServer = () => {
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
