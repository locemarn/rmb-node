import { UserEntity } from '../../../modules/user/domain/entity/user.entity'
import { GraphqlUserController } from '../../../modules/user/infra/api/graphql.controller'

const graphqlUserController = new GraphqlUserController()
// The root provides a resolver function for each API endpoint
export const Resolvers = {
  async getUsers(): Promise<UserEntity[]> {
    return (await graphqlUserController.getUsers()) as UserEntity[]
  },

  async createUser({ user }: { user: UserEntity }) {
    if (!user) throw new Error('User must e provide!')
    try {
      return (await graphqlUserController.createUser(user)) as UserEntity
    } catch (error) {
      const err = error as Error
      return err.message
    }
  },

  async updateUser({ user }: { user: UserEntity }) {
    if (!user?.id) throw new Error('User ID must be provided!')
    try {
      return await graphqlUserController.updateUser(user)
    } catch (error) {
      const err = error as Error
      return err.message
    }
  },

  async getUserById({ id }: { id: number }) {
    if (!id) throw new Error('User ID must be provided!')
    try {
      return await graphqlUserController.getUserById(id)
    } catch (error) {
      const err = error as Error
      return err.message
    }
  },

  async deleteUser({ id }: { id: number }) {
    if (!id) throw new Error('User ID must be provided!')
    try {
      return await graphqlUserController.deleteUser(id)
    } catch (error) {
      const err = error as Error
      return err.message
    }
  },
}
