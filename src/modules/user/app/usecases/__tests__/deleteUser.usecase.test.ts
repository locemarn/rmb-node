import { UserRepositoryInterface } from '../../../domain/repository/userRepository.interface'
import { MockUserRepository } from '../../../infra/repository/mockUsers.repository'
import { UserRepository } from '../../../infra/repository/user.repository'
import { DeleteUserUseCase } from '../deleteUser.usecase'

describe('DeleteUsersUseCase', () => {
  let repo: UserRepositoryInterface
  let userRepository: UserRepository
  let deleteUserUseCase: DeleteUserUseCase

  beforeEach(() => {
    repo = new MockUserRepository()
    userRepository = new UserRepository(repo)
    deleteUserUseCase = new DeleteUserUseCase(userRepository)
  })

  afterEach(() => {
    repo = {} as MockUserRepository
    jest.clearAllMocks()
  })

  test('should delete an user', async () => {
    const userId = 1
    const sut = await deleteUserUseCase.execute(userId)
    expect(sut).not.toBeNull()
    expect(sut?.id).toBe(userId)
  })
})
