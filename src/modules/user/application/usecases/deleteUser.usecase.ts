import { UserEntity } from '../../domain/entity/user.entity'
import { UserRepository } from '../../infra/repository/user.repository'

export class DeleteUserUseCase {
  private _repository: UserRepository

  constructor(repository: UserRepository) {
    this._repository = repository
  }

  async execute(id: number): Promise<Omit<UserEntity, 'password'> | null> {
    return this._repository.deleteUser(id)
  }
}
