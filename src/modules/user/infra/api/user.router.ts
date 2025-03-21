import { Router, Request, Response } from 'express'
import { UserController } from './user.controller'

const userRouter = Router()

const userController = new UserController()

userRouter
  .route('/')
  .get(async (req, res) => {
    await userController.getUsers(req, res)
  })
  .post(async (req: Request, res: Response) => {
    await userController.createUser(req, res)
  })
userRouter
  .route('/:id')
  .patch(async (req: Request, res: Response) => {
    await userController.updateUser(req, res)
  })
  .delete(async (req: Request, res: Response) => {
    await userController.deleteUser(req, res)
  })
  .get(async (req: Request, res: Response) => {
    await userController.getUserById(req, res)
  })

export default userRouter
