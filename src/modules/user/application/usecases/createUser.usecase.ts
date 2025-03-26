import { UserEntity } from '../../domain/entity/user.entity'
import { UserRepository } from '../../infra/repository/user.repository'

export class CreateUserUseCase {
  private _repository: UserRepository

  constructor(repository: UserRepository) {
    this._repository = repository
  }

  async execute(input: UserEntity): Promise<UserEntity> {
    try {
      return this._repository.createUser(input)
    } catch (error) {
      return { error } as unknown as UserEntity
    }
  }
}
