import { UserRepositoryInterface } from '../../domain/repository/userRepository.interface'
import { MockUserRepository } from './mockUsers.repository'

describe('UserRepository', () => {
  let repo: UserRepositoryInterface

  beforeEach(() => {
    repo = new MockUserRepository()
  })

  afterEach(() => {
    repo = {} as MockUserRepository
    jest.clearAllMocks()
  })

  describe('Get All users', () => {
    test('should return a list of users', async () => {
      const sut = await repo.getUsers()
      expect(sut).toBeInstanceOf(Array)
      expect(sut.length).toBeGreaterThan(0)
    })
  })
})
