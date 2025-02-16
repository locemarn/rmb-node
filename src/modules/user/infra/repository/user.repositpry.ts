import { UserEntity } from '../../domain/entity/user.entity'
import { UserRepositoryInterface } from '../../domain/repository/userRepository.interface'

export class UserRepository implements UserRepositoryInterface {
  getUsers(): Promise<UserEntity[]> {
    return Promise.resolve([] as UserEntity[])
  }
}
