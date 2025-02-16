import { Request, Response } from 'express'
import { GetUsersUseCase } from '../../app/usecases/getUsers.usecase'
import { UserRepository } from '../repository/user.repositpry'

export class UserController {
  // constructor(getUsersUseCase) {
  //   this.getUsersUseCase = getUsersUseCase
  // }
  getUsers(req: Request, res: Response): Response {
    try {
      const getUsersUseCase = new GetUsersUseCase(new UserRepository())
      const response = getUsersUseCase.execute()
      return res.status(200).json({ response })
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: 'Something went wrong!',
        errorMessage: error,
      })
    }
  }
}
