/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { faker } from '@faker-js/faker/.'
import { UserEntity } from '../../../domain/entity/user.entity'
import { UserRepositoryInterface } from '../../../domain/repository/userRepository.interface'
import { prismaMock } from './singleton'
import { UserPrismaRepository } from './userPrisma.repository'

export const mockUser: UserEntity = {
  username: faker.internet.username(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: 'tester',
}

export const mockUserResponse = {
  ...mockUser,
  id: 1,
  created_at: faker.date.recent({ days: 10 }),
  updated_at: faker.date.recent({ days: 10 }),
}

describe('UserPrismaRepository', () => {
  let _repo: UserRepositoryInterface

  beforeEach(() => {
    _repo = new UserPrismaRepository()
  })

  afterEach(() => {
    _repo = {} as UserPrismaRepository
    jest.clearAllMocks()
  })

  describe('GetAll users', () => {
    test('get all users', async () => {
      prismaMock.user.findMany.mockResolvedValue([mockUserResponse])
      const sut = await _repo.getUsers()
      // console.log('sut', sut)
      expect(sut).toBeInstanceOf(Array)
      expect(sut.length).toBeGreaterThan(0)
    })

    test('should throw error when get all users faill', async () => {
      prismaMock.user.findMany.mockRejectedValue(
        new Error('Error fetching users')
      )
      await expect(_repo.getUsers()).rejects.toThrow('Error fetching users')
    })
  })

  describe('Create user', () => {
    test('create user', async () => {
      prismaMock.user.create.mockResolvedValue(mockUserResponse)
      const sut = await _repo.create(mockUser)
      expect(sut.id).toBeGreaterThan(0)
      expect(sut.created_at).toBeInstanceOf(Date)
      expect(sut.updated_at).toBeInstanceOf(Date)
    })

    test('should throw error when create user faill', async () => {
      await expect(_repo.create({} as unknown as UserEntity)).rejects.toThrow(
        'Invalid user data.'
      )
    })
  })

  describe('Update user', () => {
    test('update user', async () => {
      prismaMock.user.update.mockResolvedValue({
        ...mockUserResponse,
        username: 'updated_username',
      })

      // const userToUpdateId = userToUpdate[0].id ?? 1
      const sut = await _repo.update(mockUserResponse.id, {
        ...mockUser,
        username: 'updated_username',
      })

      expect(sut).toMatchObject({
        id: expect.any(Number),
        username: 'updated_username',
        email: expect.any(String),
        password: expect.any(String),
        role: expect.any(String),
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      })
    })

    test('should throw error when update user faill', async () => {
      await expect(
        _repo.update(0, {} as unknown as UserEntity)
      ).rejects.toThrow('id required for update.')
    })
  })

  describe('Delete user', () => {
    test('delete user', async () => {
      prismaMock.user.delete.mockResolvedValue(mockUserResponse)
      const sut = await _repo.delete(mockUserResponse.id)
      expect(sut).not.toBe(null)
    })

    test('should throw error when delete user faill', async () => {
      await expect(_repo.delete(null as unknown as number)).rejects.toThrow(
        'id required for delete.'
      )
    })
  })

  describe('Get user by id', () => {
    test('get user by id', async () => {
      prismaMock.user.findUnique.mockResolvedValue(mockUserResponse)
      const sut = await _repo.getUserById(mockUserResponse.id)
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

    test('should throw an error when get user by id faill', async () => {
      await expect(
        _repo.getUserById(null as unknown as number)
      ).rejects.toThrow('Invalid user id.')
    })
  })
})
