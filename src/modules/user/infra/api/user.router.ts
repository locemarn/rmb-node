import { Router } from 'express'
import { UserController } from './user.controller'

const userRouter = Router()

const userController = new UserController()

userRouter.route('/').get(async (req, res) => {
  await userController.getUsers(req, res)
})
// .post((req, res) => {
//   // Implement POST user logic
// })

export default userRouter
