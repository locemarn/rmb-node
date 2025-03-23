import { UserRepositoryInterface } from '../../../domain/repository/userRepository.interface'
import { MockUserRepository } from '../../../infra/repository/mockUsers.repository'
import { UserRepository } from '../../../infra/repository/user.repository'
import { GetUserByIdUseCase } from '../getUserById.usecase'

describe('GetUserByIdUseCase', () => {
  let repo: UserRepositoryInterface
  let userRepository: UserRepository
  let getUserByIdUseCase: GetUserByIdUseCase

  beforeEach(() => {
    repo = new MockUserRepository()
    userRepository = new UserRepository(repo)
    getUserByIdUseCase = new GetUserByIdUseCase(userRepository)
  })

  afterEach(() => {
    repo = {} as MockUserRepository
    jest.clearAllMocks()
  })

  test('should return all users', async () => {
    const userId = 1
    const sut = await getUserByIdUseCase.execute(userId)
    expect(sut.id).toBe(userId)
  })
})
