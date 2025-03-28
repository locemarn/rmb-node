/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Request, Response } from 'express'
import { UserRepositoryInterface } from '../../../user/domain/repository/userRepository.interface'
import { UserPrismaRepository } from '../../../user/infra/database/prisma/userPrisma.repository'
import { UserRepository } from '../../../user/infra/repository/user.repository'
import { GetUserByEmailUseCase } from '../../../user/application/usecases/getUerByEmail.usecase'
import { comparePasswords, generateToken } from '../../../../utils/libs/jwt'

export class LoginController {
  private _prismaRepo: UserRepositoryInterface
  private _userRepository: UserRepository
  private _getUserByEmail: GetUserByEmailUseCase

  constructor() {
    this._prismaRepo = new UserPrismaRepository()
    this._userRepository = new UserRepository(this._prismaRepo)
    this._getUserByEmail = new GetUserByEmailUseCase(this._userRepository)
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { password, email }: { password: string; email: string } = req.body

      const user = await this._getUserByEmail.execute(email)
      if (!user) throw new Error('User not found.')

      const isValidPassword = comparePasswords(password, user.password)
      if (!isValidPassword) throw new Error('Invalid password.')

      const { token, message } = generateToken(user.email)

      console.log('login ok', token)
      console.log('user', user)

      return res.status(200).json({ token, user, message })
    } catch (error) {
      console.log(error)
      return res
        .status(400)
        .json({ error: error, message: 'Error when login user.' })
    }
  }
}
