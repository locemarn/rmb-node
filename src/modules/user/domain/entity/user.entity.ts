import { randomInt } from 'node:crypto'

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export class UserEntity {
  id?: number
  username: string
  email: string
  password: string
  role: 'superuser' | 'admin' | 'reader' | 'editor' | 'tester'
  created_at?: Date
  updated_at?: Date

  private constructor(data: UserEntity) {
    this.username = data.username
    this.email = data.email
    this.password = data.password
    this.role = data.role
  }

  static create(
    data: WithOptional<UserEntity, 'id' | 'created_at' | 'updated_at'>
  ): UserEntity {
    return new UserEntity({
      ...data,
      id: data.id ?? randomInt(0, 1000),
      created_at: data.created_at ?? new Date(),
      updated_at: data.updated_at ?? new Date(),
    })
  }

  static createFrom(data: UserEntity): UserEntity {
    return new UserEntity(data)
  }
}
