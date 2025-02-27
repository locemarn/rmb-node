import { UserEntity } from '../../domain/entity/user.entity'
import { UserRepository } from '../../infra/repository/user.repository'

export class GetUserByEmailUseCase {
  private _repository: UserRepository

  constructor(repository: UserRepository) {
    this._repository = repository
  }

  async execute(email: string): Promise<UserEntity> {
    return await this._repository.getUserByEmail(email)
  }
}
