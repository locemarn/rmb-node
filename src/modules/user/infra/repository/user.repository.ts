import { InvalidInputErrors } from '../../../../utils/fixtures/errors/invalidInputErrors'
import { UserEntity } from '../../domain/entity/user.entity'
import { UserRepositoryInterface } from '../../domain/repository/userRepository.interface'

export class UserRepository {
  private _repository: UserRepositoryInterface

  constructor(repository: UserRepositoryInterface) {
    this._repository = repository
  }

  async getAllUsers(): Promise<UserEntity[]> {
    try {
      const users = await this._repository.getUsers()
      return users
    } catch (error) {
      const err = error as Error
      // change kind of error here
      throw new InvalidInputErrors(err.message)
    }
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    try {
      if (!user.username || !user.email || !user.password) {
        throw new Error('Invalid user data.')
      }
      return await this._repository.create(user)
    } catch (error) {
      const err = error as Error
      throw new InvalidInputErrors(err.message)
    }
  }

  async updateUser(id: number, user: UserEntity): Promise<UserEntity | null> {
    if (!id) throw new Error('id required for update.')
    if (!user.username || !user.email || !user.password) {
      throw new Error('Invalid user data.')
    }
    console.log('Updating user  with id:', id)
    return await this._repository.update(id, user)
  }

  async deleteUser(id: number): Promise<UserEntity | null> {
    if (!id) throw new Error('id required for delete.')
    return await this._repository.delete(id)
  }

  async getUserById(id: number): Promise<UserEntity> {
    if (!id) throw new Error('Invalid user id.')
    const user = await this._repository.getUserById(id)
    return user
  }
}
