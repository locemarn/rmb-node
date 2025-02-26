import { UserEntity } from '../../../domain/entity/user.entity'
import { UserRepositoryInterface } from '../../../domain/repository/userRepository.interface'
import { MockUserRepository } from '../../../infra/repository/mockUsers.repository'
import { UserRepository } from '../../../infra/repository/user.repository'
import { CreateUserUseCase } from '../createUser.usecase'

describe('CreateUsersUseCase', () => {
  let repo: UserRepositoryInterface
  let userRepository: UserRepository
  let getUsersUseCase: CreateUserUseCase

  beforeEach(() => {
    repo = new MockUserRepository()
    userRepository = new UserRepository(repo)
    getUsersUseCase = new CreateUserUseCase(userRepository)
  })

  afterEach(() => {
    repo = {} as MockUserRepository
    // jest.clearAllMocks()
  })

  test('should return all users', async () => {
    const user: UserEntity = {
      username: 'username',
      email: 'test@email.com',
      password: 'password',
      role: 'tester',
    }
    const sut = await getUsersUseCase.execute(user)
    expect(sut.username).toBe(user.username)
    expect(sut.email).toBe(user.email)
    expect(sut.password).toBe(user.password)
    expect(sut.role).toBe(user.role)
    expect(sut.id).toBeDefined()
    expect(sut.created_at).toBeInstanceOf(Date)
    expect(sut.updated_at).toBeInstanceOf(Date)
  })
})
