import { UserEntity } from '../entity/user.entity'

export interface UserRepositoryInterface {
  getUsers(): Promise<Omit<UserEntity, 'password'>[]>
  create(user: UserEntity): Promise<UserEntity>
  update(id: number, user: UserEntity): Promise<UserEntity | null>
  delete(id: number): Promise<Omit<UserEntity, 'password'> | null>
  getUserById(id: number): Promise<Omit<UserEntity, 'password'> | null>
  getUserByEmail(email: string): Promise<UserEntity>
}
