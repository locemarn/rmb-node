import { Request, Response } from 'express'
import { GetUsersUseCase } from '../../app/usecases/getUsers.usecase'
import { UserRepository } from '../repository/user.repository'
import { UserRepositoryInterface } from '../../domain/repository/userRepository.interface'
import { UserPrismaRepository } from '../database/prisma/userPrisma.repository'

export class UserController {
  private _prismaRepo: UserRepositoryInterface
  private _userRepository: UserRepository
  private _getUsersUseCase: GetUsersUseCase

  constructor() {
    this._prismaRepo = new UserPrismaRepository()
    this._userRepository = new UserRepository(this._prismaRepo)
    this._getUsersUseCase = new GetUsersUseCase(this._userRepository)
  }
  async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const response = await this._getUsersUseCase.execute()
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
