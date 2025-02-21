import { UserEntity } from '../entity/user.entity'

export interface UserRepositoryInterface {
  getUsers(): Promise<UserEntity[]>
  create(user: UserEntity): Promise<UserEntity | null>
  update(id: number, user: UserEntity): Promise<UserEntity | null>
  delete(id: number): Promise<UserEntity | null>
  getUserById(id: number): Promise<UserEntity | null | string>
}
