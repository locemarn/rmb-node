import { Request, Response } from 'express'
import { GetUsersUseCase } from '../../app/usecases/getUsers.usecase'
import { UserRepository } from '../repository/user.repository'
import { UserRepositoryInterface } from '../../domain/repository/userRepository.interface'
import { UserPrismaRepository } from '../database/prisma/userPrisma.repository'
import { CreateUserUseCase } from '../../app/usecases/createUser.usecase'
import { UserEntity } from '../../domain/entity/user.entity'
import { UpdateUserUseCase } from '../../app/usecases/updateUser.usecase'
import { encryptHash } from '../../../../utils/libs/jwt'

export class UserController {
  private _prismaRepo: UserRepositoryInterface
  private _userRepository: UserRepository
  private _getUsersUseCase: GetUsersUseCase
  private _createUserUseCase: CreateUserUseCase
  private _updateUserUseCase: UpdateUserUseCase

  constructor() {
    this._prismaRepo = new UserPrismaRepository()
    this._userRepository = new UserRepository(this._prismaRepo)
    this._getUsersUseCase = new GetUsersUseCase(this._userRepository)
    this._createUserUseCase = new CreateUserUseCase(this._userRepository)
    this._updateUserUseCase = new UpdateUserUseCase(this._userRepository)
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

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { password } = req.body as UserEntity
      const userId = encryptHash(password)
      const user: UserEntity = {
        ...req.body,
        id: userId,
      } as UserEntity
      const response = await this._createUserUseCase.execute(user)
      return res.status(201).json({ response })
    } catch (error) {
      console.log('error', error)
      return res.status(500).json({
        error: true,
        message: 'Something went wrong!',
        errorMessage: error,
      })
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id)
      const user = {
        ...req.body,
      } as UserEntity
      const response = await this._updateUserUseCase.execute(id, user)
      return res.status(200).json({ response })
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: 'Something went wrong!',
        errorMessage: error,
      })
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id)
      const response = await this._userRepository.deleteUser(id)
      return res.status(200).json({ response })
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: 'Something went wrong!',
        errorMessage: error,
      })
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id)
      const response = await this._userRepository.getUserById(id)
      return res.status(200).json({ response })
    } catch (error) {
      const err = error as Error

      return res.status(500).json({
        error: true,
        message: err.message,
        errorMessage: err.name,
        stack: err.stack,
      })
    }
  }
}
