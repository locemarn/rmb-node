import express from 'express'
import { GetUsersUseCase } from '../usecase/getUsers.usecase'

const userRouter = express.Router()

userRouter.get('/', (req, res) => {
  const getUsersUseCase = new GetUsersUseCase()

  const result = getUsersUseCase.execute()

  res.status(200).json({ result })
})

export default userRouter
