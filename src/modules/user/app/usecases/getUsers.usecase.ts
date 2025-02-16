import { UserRepositoryInterface } from '../../domain/repository/userRepository.interface'

export class GetUsersUseCase {
  private _repository: UserRepositoryInterface
  constructor(public repository: UserRepositoryInterface) {
    this._repository = repository
  }
  execute() {
    return this._repository.getUsers()
  }
}
