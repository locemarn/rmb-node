 
import { Router, Response, Request } from 'express'
import { LoginController } from './login.controller'

const authRouter = Router()
const loginController = new LoginController()

authRouter.route('/').post(async (req: Request, res: Response) => {
  await loginController.login(req, res)
})

export default authRouter
