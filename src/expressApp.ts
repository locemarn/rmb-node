import express, { NextFunction, Response, Request } from 'express'
import userRouter from './modules/user/controller/user.controller'
const app = express()
import config from './config'

const prefixRoute = config.route.prefix

app.use(express.json())

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.get('/', (req: Request, res: Response): any => {
  return res.status(200).json({
    message: 'everything works well.',
  })
})

// Routes
app.use(`${prefixRoute}/users`, userRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).send({ error: true, message: 'Something went wrong!' })
  next(err)
})

export default app
