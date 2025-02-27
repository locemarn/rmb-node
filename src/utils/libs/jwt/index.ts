import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../../../config'

export function encryptHash(password: string) {
  if (!password) throw new Error('password must be provided')
  return bcrypt.hashSync(password, 10)
}

export function comparePasswords(
  password: string,
  hasehdPassword: string
): boolean {
  return bcrypt.compareSync(password, hasehdPassword)
}

export function generateToken(params: string) {
  if (!config.jwt.secret) {
    throw new Error('JWT secret is not defined')
  }
  const token = jwt.sign({ params }, config.jwt.secret, {
    expiresIn: '8h',
  })
  return { token, message: 'User Logged in Successfully' }
}
