import { UserEntity } from '../../domain/entity/user.entity'
import { UserRepository } from '../../infra/repository/user.repository'

export class GetUserByIdUseCase {
  private _repository: UserRepository

  constructor(repository: UserRepository) {
    this._repository = repository
  }

  async execute(id: number): Promise<UserEntity> {
    return await this._repository.getUserById(id)
  }
}
