import { UserRepositoryInterface } from '../../../domain/repository/userRepository.interface'
import { MockUserRepository } from '../../repository/mockUsers.repository'

describe('UserPrismaRepository', () => {
  let repo: UserRepositoryInterface

  beforeEach(() => {
    repo = new MockUserRepository()
  })

  afterEach(() => {
    repo = {} as MockUserRepository
    jest.clearAllMocks()
  })

  describe('GetAll users', () => {
    test('get all users', async () => {
      const sut = await repo.getUsers()
      expect(sut).toBeInstanceOf(Array)
      expect(sut.length).toBeGreaterThan(0)
    })
  })
})
