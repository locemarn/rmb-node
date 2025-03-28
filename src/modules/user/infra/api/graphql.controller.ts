import { GetUsersUseCase } from '../../application/usecases/getUsers.usecase'
import { UserRepository } from '../repository/user.repository'
import { UserRepositoryInterface } from '../../domain/repository/userRepository.interface'
import { UserPrismaRepository } from '../database/prisma/userPrisma.repository'
import { CreateUserUseCase } from '../../application/usecases/createUser.usecase'
import { UserEntity } from '../../domain/entity/user.entity'
import { UpdateUserUseCase } from '../../application/usecases/updateUser.usecase'
import { encryptHash } from '../../../../utils/libs/jwt'
import { DeleteUserUseCase } from '../../application/usecases/deleteUser.usecase'

interface IError {
  name: string
  message: string
  stack?: string
}

export class GraphqlUserController {
  private _prismaRepo: UserRepositoryInterface
  private _userRepository: UserRepository
  private _getUsersUseCase: GetUsersUseCase
  private _createUserUseCase: CreateUserUseCase
  private _updateUserUseCase: UpdateUserUseCase
  private _deleteUserUseCase: DeleteUserUseCase

  constructor() {
    this._prismaRepo = new UserPrismaRepository()
    this._userRepository = new UserRepository(this._prismaRepo)
    this._getUsersUseCase = new GetUsersUseCase(this._userRepository)
    this._createUserUseCase = new CreateUserUseCase(this._userRepository)
    this._updateUserUseCase = new UpdateUserUseCase(this._userRepository)
    this._deleteUserUseCase = new DeleteUserUseCase(this._userRepository)
  }
  async getUsers(): Promise<Omit<UserEntity, 'password'>[] | string | null> {
    try {
      const response = await this._getUsersUseCase.execute()
      return response
    } catch (error) {
      const err = error as Error
      return err.message
    }
  }

  async createUser(
    user: UserEntity
  ): Promise<Omit<UserEntity, 'password'> | IError> {
    try {
      const { password } = user
      const userId = encryptHash(password)
      const newUser: UserEntity = {
        ...user,
        password: userId,
      } as UserEntity
      const response = await this._createUserUseCase.execute(newUser)
      console.log('response --->', response)
      return response
    } catch (error) {
      const err = error as Error
      console.log('GraphqlUserController err.name', err.name)
      console.log('GraphqlUserController err.message', err.message)
      console.log('GraphqlUserController err.stack', err.stack)
      return err
    }
  }

  async updateUser(
    user: UserEntity
  ): Promise<Omit<UserEntity, 'password'>> {
    if (!user?.id) throw new Error('User id must be provide.')
    try {
      const hasUser = await this._userRepository.getUserById(user.id) as UserEntity
      if (!hasUser) throw new Error(' User not found!')

      const updateUser = {
        username: user.username ? user.username : hasUser.username,
        email: user.email ? user.email : hasUser.email,
        password: user.password ? encryptHash(user.password) : hasUser.password,
        role: user.role ? user.role : hasUser.role,
      } as UserEntity
      const response = await this._updateUserUseCase.execute(
        user.id,
        updateUser
      )
      return response!
    } catch (error) {
      const err = error as Error
      throw err
    }
  }

  async deleteUser(
    id: number
  ): Promise<Omit<UserEntity, 'password'> | string | null> {
    if (!id) throw new Error('User id must be provide.')
    try {
      return await this._deleteUserUseCase.execute(id)
    } catch (error) {
      const err = error as Error
      throw err
    }
  }

  async getUserById(
    id: number
  ): Promise<Omit<UserEntity, 'password'> | string | null> {
    if (!id) throw new Error('User id must be provide.')
    try {
      const response = await this._userRepository.getUserById(id)
      return response
    } catch (error) {
      const err = error as Error
      return err.message
    }
  }
}
