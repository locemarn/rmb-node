import { PrismaClient } from '@prisma/client'
import { UserEntity } from '../../../domain/entity/user.entity'
import { UserRepositoryInterface } from '../../../domain/repository/userRepository.interface'
import prisma from './client'

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
      console.error('Error fetching users:', error)
      throw error
    }
  }

  async create(user: UserEntity): Promise<UserEntity> {
    try {
      const createdUser = await this._prisma.user.create({
        data: {
          username: user.username,
          email: user.email,
          password: user.password,
          role: user.role || 'reader',
        },
      })
      return createdUser
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  async update(id: number, user: UserEntity): Promise<UserEntity> {
    try {
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
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  }

  async delete(id: number): Promise<UserEntity | null> {
    try {
      const user = await this._prisma.user.delete({
        where: { id },
      })
      return user
    } catch (error) {
      console.error('Error deleting user:', error)
      throw error
    }
  }

  async getUserById(id: number): Promise<UserEntity | null> {
    try {
      const user = await this._prisma.user.findUnique({
        where: { id },
      })
      if (!user) return null
      return user
    } catch (error) {
      console.error('Error fetching user by id:', error)
      throw error
    }
  }
}
