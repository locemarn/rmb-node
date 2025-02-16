import express, { NextFunction, Response, Request } from 'express'
const app = express()
import config from '../config'
import userRouter from '../modules/user/infra/api/user.router'

const prefixRoute = config.route.prefix

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.get('/', (req: Request, res: Response): any => {
  return res.status(200).json({
    message: 'everything works well.',
  })
})

// Routes
app.use(`${prefixRoute}/users`, userRouter)

// check errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).send({ error: true, message: 'Something went wrong!' })
  next(err)
})

export default app
