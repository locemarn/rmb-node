import { UserEntity } from '../entity/user.entity'

export interface UserRepositoryInterface {
  getUsers(): Promise<UserEntity[]>
}
