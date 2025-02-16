import { UserEntity } from '../domain/entity/user.entity'
import { UserRepositoryInterface } from '../domain/repository/userRepository.interface'

export class UserService {
  private _repository: UserRepositoryInterface
  constructor(repository: UserRepositoryInterface) {
    this._repository = repository
  }

  async getUsers(): Promise<UserEntity[]> {
    return await this._repository.getUsers()
  }
}
