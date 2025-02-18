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
  id: faker.number.int({ min: 1, max: 100000 }),
  created_at: faker.date.recent({ days: 10 }),
  updated_at: faker.date.recent({ days: 10 }),
}

export class MockUserRepository implements UserRepositoryInterface {
  private users: UserEntity[] = [mockUser]

  async getUsers(): Promise<UserEntity[]> {
    const userList = []
    for (let i = 0; i < 10; i++) {
      userList.push(mockUserResponse)
    }
    return Promise.resolve(userList)
  }
}
