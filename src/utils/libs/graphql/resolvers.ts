import { PostEntity } from '../../../modules/post/domain/entity/post.entity'
import { GraphqlPostController } from '../../../modules/post/infra/api/graphql.controller'
import { UserEntity } from '../../../modules/user/domain/entity/user.entity'
import { GraphqlUserController } from '../../../modules/user/infra/api/graphql.controller'

const graphqlUserController = new GraphqlUserController()
const graphqlPostController = new GraphqlPostController()
// The root provides a resolver function for each API endpoint
export const UserResolvers = {
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

export const PostResolvers = {
  async getPosts(): Promise<PostEntity[]> {
    return (await graphqlPostController.getPosts()) as PostEntity[]
  },

  async createPost({ post }: { post: PostEntity }) {
    console.log('createPost post', post)
    try {
      return (await graphqlPostController.createPost(post)) as PostEntity
    } catch (error) {
      const err = error as Error
      return err.message
    }
  },

  async updatePost({ post }: { post: PostEntity }) {
    if (!post?.id) throw new Error('User ID must be provided!')
    try {
      return await graphqlPostController.updatePost(post)
    } catch (error) {
      const err = error as Error
      return err.message
    }
  },

  async getPostById({ id }: { id: number }) {
    if (!id) throw new Error('User ID must be provided!')
    try {
      return await graphqlPostController.getPostById(id)
    } catch (error) {
      const err = error as Error
      return err.message
    }
  },

  async deletePost({ id }: { id: number }) {
    if (!id) throw new Error('User ID must be provided!')
    try {
      return await graphqlPostController.deletePost(id)
    } catch (error) {
      const err = error as Error
      return err.message
    }
  },

  async getPostsByTitle({ title }: { title: string }) {
    if (!title) throw new Error('User ID must be provided!')
    try {
      return await graphqlPostController.getPostsByTitle(title)
    } catch (error) {
      const err = error as Error
      return err.message
    }
  },
}
