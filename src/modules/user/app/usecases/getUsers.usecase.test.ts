import { UserRepositoryInterface } from '../../domain/repository/userRepository.interface'
import { MockUserRepository } from '../../infra/repository/mockUsers.repository'
import { GetUsersUseCase } from './getUsers.usecase'

describe('GetUsersUseCase', () => {
  let repo: UserRepositoryInterface

  beforeEach(() => {
    repo = new MockUserRepository()
  })

  afterEach(() => {
    repo = {} as MockUserRepository
    jest.clearAllMocks()
  })

  test('should return all users', async () => {
    const useCase = new GetUsersUseCase(repo)
    const users = await useCase.execute()

    expect(users).toBeInstanceOf(Array)
    expect(users.length).toBeGreaterThan(0)
  })
})
