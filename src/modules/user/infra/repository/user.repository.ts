import { ResponseError } from '../../../../utils/fixtures/errors/responseError'
import { UserEntity } from '../../domain/entity/user.entity'
import { UserRepositoryInterface } from '../../domain/repository/userRepository.interface'

export class UserRepository {
  private _repository: UserRepositoryInterface

  constructor(repository: UserRepositoryInterface) {
    this._repository = repository
  }

  async getAllUsers(): Promise<Omit<UserEntity, 'password'>[]> {
    try {
      const users = await this._repository.getUsers()
      return users
    } catch (error) {
      const err = error as Error
      // change kind of error here
      throw new ResponseError(err.message)
    }
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    try {
      if (!user.username || !user.email || !user.password || !user.role)
        throw new Error('Invalid user data.')
      const res = await this._repository.create(user)
      return res
    } catch (error) {
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }

  async updateUser(id: number, user: UserEntity): Promise<UserEntity | null> {
    try {
      if (!id) throw new Error('id required for update.')
      if (!user.username && !user.email && !user.password && !user.role)
        throw new Error('Invalid user data.')
      return await this._repository.update(id, user)
    } catch (error) {
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }

  async deleteUser(id: number): Promise<UserEntity | null> {
    try {
      if (!id) throw new Error('id required for delete.')
      return await this._repository.delete(id)
    } catch (error) {
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }

  async getUserById(id: number): Promise<UserEntity> {
    try {
      if (!id) throw new Error('Invalid user id.')
      const user = await this._repository.getUserById(id)
      return user
    } catch (error) {
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    try {
      if (!email) throw new Error('Invalid email.')
      const user = await this._repository.getUserByEmail(email)
      return user
    } catch (error) {
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }
}
