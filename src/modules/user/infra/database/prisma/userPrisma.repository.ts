import { PrismaClient } from '@prisma/client'
import { UserEntity } from '../../../domain/entity/user.entity'
import { UserRepositoryInterface } from '../../../domain/repository/userRepository.interface'
import prisma from './client'

export abstract class UserPrismaRepository implements UserRepositoryInterface {
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
}
