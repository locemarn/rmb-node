import { UserEntity } from '../../domain/entity/user.entity'
import { UserRepository } from '../../infra/repository/user.repository'

export class UpdateUserUseCase {
  private _repository: UserRepository

  constructor(repository: UserRepository) {
    this._repository = repository
  }

  async execute(id: number, input: UserEntity): Promise<UserEntity | null> {
    return this._repository.updateUser(id, input)
  }
}
