import { faker } from '@faker-js/faker'
import { UserEntity } from '../../domain/entity/user.entity'
import { UserRepositoryInterface } from '../../domain/repository/userRepository.interface'

export const mockUser: UserEntity = {
  username: faker.internet.username(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: 'tester',
}

export const mockUserResponse: UserEntity = {
  ...mockUser,
  id: 1,
  created_at: faker.date.recent({ days: 10 }),
  updated_at: faker.date.recent({ days: 10 }),
}

export class MockUserRepository implements UserRepositoryInterface {
  private users: UserEntity[] = [mockUserResponse]

  async getUsers(): Promise<UserEntity[]> {
    return Promise.resolve(this.users)
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const newUser: UserEntity = {
      ...user,
      id: faker.number.int({ min: 1, max: 100000 }),
      created_at: new Date(),
      updated_at: new Date(),
    }
    this.users.push(newUser)
    return Promise.resolve(newUser)
  }
  async update(id: number, user: UserEntity): Promise<UserEntity | null> {
    if (!id) throw new Error()
    const updatedUser = {
      id,
      ...user,
      updated_at: new Date(),
    }
    return Promise.resolve(updatedUser)
  }
  async delete(id: number): Promise<UserEntity | null> {
    const deletedUser: UserEntity = {
      ...mockUserResponse,
      id,
      updated_at: new Date(),
    }
    return Promise.resolve(deletedUser) as unknown as Promise<UserEntity>
  }
  async getUserById(_id: number): Promise<UserEntity> {
    const userFounded = this.users.find((user) => user.id === _id)
    return Promise.resolve(userFounded) as unknown as Promise<UserEntity>
  }
}
