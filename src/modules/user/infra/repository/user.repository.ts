import { PrismaClient } from '@prisma/client'
import { UserEntity } from '../../domain/entity/user.entity'
import { UserRepositoryInterface } from '../../domain/repository/userRepository.interface'
import prisma from '../database/prisma/client'

export class UserRepository implements UserRepositoryInterface {
  _prisma: PrismaClient

  constructor() {
    this._prisma = prisma
  }
  async getUsers(): Promise<UserEntity[]> {
    const users = await prisma.user.findMany({})
    return users
  }
}
