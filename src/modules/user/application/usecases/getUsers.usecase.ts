import { UserRepository } from '../../infra/repository/user.repository'

export class GetUsersUseCase {
  private _repository: UserRepository

  constructor(repository: UserRepository) {
    this._repository = repository
  }

  async execute() {
    return this._repository.getAllUsers()
  }
}
