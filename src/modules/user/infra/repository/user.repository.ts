import { UserEntity } from '../../domain/entity/user.entity'
import { UserRepositoryInterface } from '../../domain/repository/userRepository.interface'
import { UserPrismaRepository } from '../database/prisma/userPrisma.repository'

export class UserRepository
  extends UserPrismaRepository
  implements UserRepositoryInterface
{
  constructor() {
    super()
  }

  async getUsers(): Promise<UserEntity[]> {
    return await super.getUsers()
  }
}
