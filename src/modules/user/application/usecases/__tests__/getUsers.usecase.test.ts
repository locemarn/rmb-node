import { UserRepositoryInterface } from '../../../domain/repository/userRepository.interface'
import { MockUserRepository } from '../../../infra/repository/mockUsers.repository'
import { UserRepository } from '../../../infra/repository/user.repository'
import { GetUsersUseCase } from '../getUsers.usecase'

describe('GetUsersUseCase', () => {
  let repo: UserRepositoryInterface
  let userRepository: UserRepository
  let getUsersUseCase: GetUsersUseCase

  beforeEach(() => {
    repo = new MockUserRepository()
    userRepository = new UserRepository(repo)
    getUsersUseCase = new GetUsersUseCase(userRepository)
  })

  afterEach(() => {
    repo = {} as MockUserRepository
    // jest.clearAllMocks()
  })

  test('should return all users', async () => {
    const sut = await getUsersUseCase.execute()
    expect(sut).toBeInstanceOf(Array)
    expect(sut.length).toBeGreaterThan(0)
  })
})
