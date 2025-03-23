import { Prisma, PrismaClient } from '@prisma/client'
import { UserEntity } from '../../../domain/entity/user.entity'
import { UserRepositoryInterface } from '../../../domain/repository/userRepository.interface'
import { ResponseError } from '../../../../../utils/fixtures/errors/responseError'
import prisma from '../../../../../infra/libs/prisma/client'

export class UserPrismaRepository implements UserRepositoryInterface {
  _prisma: PrismaClient

  constructor() {
    this._prisma = prisma
  }

  async getUsers(): Promise<Omit<UserEntity, 'password'>[]> {
    try {
      const users = await this._prisma.user.findMany({
        omit: {
          password: true,
        },
      })

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
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          console.log(
            'There is a unique constraint violation, a new user cannot be created with this email'
          )
          throw Error(
            'There is a unique constraint violation, a new user cannot be created with this email'
          )
        }
      }
      throw e
    }
  }

  async update(id: number, user: UserEntity): Promise<UserEntity | null> {
    try {
      if (!id) throw new Error('id required for update.')
      const updatedUser = await this._prisma.user.update({
        where: { id },
        data: {
          ...user,
          updated_at: new Date(),
        },
      })
      return updatedUser
    } catch (error: unknown) {
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
      // console.error('UserPrismaRepository - Error fetching user by id:')
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    try {
      if (!email) throw new Error('Invalid email.')
      const user = await this._prisma.user.findUnique({
        where: { email },
      })
      if (!user) throw new Error('User not found with this email.')
      return user
    } catch (error) {
      // console.error('UserPrismaRepository - Error fetching user by email:')
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }
}
