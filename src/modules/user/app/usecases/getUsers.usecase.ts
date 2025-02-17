import { UserRepository } from '../../infra/repository/user.repository'

export class GetUsersUseCase {
  private _repository: UserRepository
  constructor(public repository: UserRepository) {
    this._repository = repository
  }
  execute() {
    return this._repository.getUsers()
  }
}
