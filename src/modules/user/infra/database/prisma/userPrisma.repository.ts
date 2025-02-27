import { PrismaClient } from '@prisma/client'
import { UserEntity } from '../../../domain/entity/user.entity'
import { UserRepositoryInterface } from '../../../domain/repository/userRepository.interface'
import prisma from './client'
import { ResponseError } from '../../../../../utils/fixtures/errors/responseError'

export class UserPrismaRepository implements UserRepositoryInterface {
  _prisma: PrismaClient

  constructor() {
    this._prisma = prisma
  }

  async getUsers(): Promise<UserEntity[]> {
    try {
      const users = await prisma.user.findMany({})
      return users
    } catch (error) {
      // console.error('Error fetching users:', error)
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }

  async create(user: UserEntity): Promise<UserEntity> {
    try {
      if (!user.username || !user.email || !user.password) {
        throw new Error('Invalid user data.')
      }
      const createdUser = await this._prisma.user.create({
        data: {
          username: user.username,
          email: user.email,
          password: user.password,
          role: user.role || 'reader',
        },
      })
      return createdUser
    } catch (error: unknown) {
      const err = error as Error
      // console.error('Error creating user:', err.message)
      throw new ResponseError(err.message)
    }
  }

  async update(id: number, user: UserEntity): Promise<UserEntity | null> {
    try {
      if (!id) throw new Error('id required for update.')
      const updatedUser = await this._prisma.user.update({
        where: { id },
        data: {
          username: user.username,
          email: user.email,
          password: user.password,
          role: user.role,
          updated_at: new Date(),
        },
      })
      return updatedUser
    } catch (error: unknown) {
      // console.error('Error updating user:')
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }

  async delete(id: number): Promise<UserEntity | null> {
    try {
      if (!id) throw new Error('id required for delete.')
      const user = await this._prisma.user.delete({
        where: { id },
      })
      return user
    } catch (error) {
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }

  async getUserById(id: number): Promise<UserEntity> {
    try {
      if (!id) throw new Error('Invalid user id.')
      const user = await this._prisma.user.findUnique({
        where: { id },
      })
      if (!user) throw new Error('Invalid user id.')
      return user
    } catch (error) {
      console.error('UserPrismaRepository - Error fetching user by id:')
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }
}
