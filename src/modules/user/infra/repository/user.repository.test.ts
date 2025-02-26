/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { UserEntity } from '../../domain/entity/user.entity'
import { MockUserRepository } from './mockUsers.repository'
import { UserRepository } from './user.repository'

describe('UserRepository', () => {
  let _repo: UserRepository

  beforeEach(() => {
    const mockRepo = new MockUserRepository()
    _repo = new UserRepository(mockRepo)
  })

  afterEach(() => {
    _repo = {} as UserRepository
    jest.clearAllMocks()
  })

  describe('Get All users', () => {
    test('should return a list of users', async () => {
      const sut = await _repo.getAllUsers()
      expect(sut).toBeInstanceOf(Array)
      expect(sut.length).toBeGreaterThan(0)
    })
  })

  describe('Create an user', () => {
    test('should create a new user', async () => {
      const user: UserEntity = {
        username: 'test2',
        email: 'test2@email.com',
        password: 'password',
        role: 'tester',
      }
      const sut = await _repo.createUser(user)
      expect(sut).toMatchObject({
        id: expect.any(Number),
        username: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
        role: expect.any(String),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      })
    })

    test('should throw an error when create user fails', async () => {
      await expect(
        _repo.createUser({} as unknown as UserEntity)
      ).rejects.toThrow('Invalid user data.')
    })
  })

  describe('Update an user', () => {
    test('should update an user', async () => {
      const user: UserEntity = {
        username: 'updated',
        email: 'updated@email.com',
        password: 'password',
        role: 'tester',
      }
      const sut = await _repo.updateUser(1, user)
      expect(sut).toMatchObject({
        id: expect.any(Number),
        username: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
        role: expect.any(String),
        updated_at: expect.any(Date),
      })
      expect(sut?.username).toBe(user.username)
      expect(sut?.email).toBe(user.email)
    })

    test('should throw an error when miss id to update an user.', async () => {
      await expect(
        _repo.updateUser(null as unknown as number, {} as unknown as UserEntity)
      ).rejects.toThrow('id required for update.')
    })

    test('should throw an error when update user fails', async () => {
      await expect(
        _repo.updateUser(1, {} as unknown as UserEntity)
      ).rejects.toThrow('Invalid user data.')
    })
  })

  describe('Delete an user', () => {
    test('should delete an user', async () => {
      const sut = await _repo.deleteUser(1)
      expect(sut).not.toBe(null)
    })

    test('should throw an error when delete user fails', async () => {
      await expect(_repo.deleteUser(null as unknown as number)).rejects.toThrow(
        'id required for delete.'
      )
    })
  })

  describe('Get user by id', () => {
    test('should return an user by id', async () => {
      const sut = await _repo.getUserById(1)
      expect(sut).toMatchObject({
        id: expect.any(Number),
        username: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
        role: expect.any(String),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      })
    })

    test('should return null when user not found by id', async () => {
      const sut = await _repo.getUserById(2)
      expect(sut).toBe(null)
    })
  })
})
