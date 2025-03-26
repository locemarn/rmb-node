import { UserEntity } from '../../domain/entity/user.entity'
import { UserRepository } from '../../infra/repository/user.repository'

export class GetUserByIdUseCase {
  private _repository: UserRepository

  constructor(repository: UserRepository) {
    this._repository = repository
  }

  async execute(id: number): Promise<UserEntity> {
    try {
      const user = await this._repository.getUserById(id)
      if (!user) throw new Error('User not found')
      return user as UserEntity
    } catch (error) {
      const err = error as Error
      throw err
    }
  }
}
