// import { PostEntity } from '../../../modules/post/domain/entity/post.entity'
import { GraphQLError } from 'graphql/error'
import { GraphqlPostController } from '../../../modules/post/infra/api/graphql.controller'
import { UserEntity } from '../../../modules/user/domain/entity/user.entity'
// import { UserEntity } from '../../../modules/user/domain/entity/user.entity'
import { GraphqlUserController } from '../../../modules/user/infra/api/graphql.controller'
import { PostEntity } from '../../../modules/post/domain/entity/post.entity'
// import { ApolloServerErrorCode } from '@apollo/server/errors'

const graphqlUserController = new GraphqlUserController()
const graphqlPostController = new GraphqlPostController()
// import { GraphQLError } from 'graphql';
// The root provides a resolver function for each API endpoint
// export const UserResolvers = {
//   async getUsers(): Promise<UserEntity[]> {
//     return (await graphqlUserController.getUsers()) as UserEntity[]
//   },

//   async createUser({ user }: { user: UserEntity }) {
//     if (!user) throw new Error('User must e provide!')
//     try {
//       return (await graphqlUserController.createUser(user)) as UserEntity
//     } catch (error) {
//       const err = error as Error
//       return err.message
//     }
//   },

//   async updateUser({ user }: { user: UserEntity }) {
//     if (!user?.id) throw new Error('User ID must be provided!')
//     try {
//       return await graphqlUserController.updateUser(user)
//     } catch (error) {
//       const err = error as Error
//       return err.message
//     }
//   },

//   async getUserById({ id }: { id: number }) {
//     if (!id) throw new Error('User ID must be provided!')
//     try {
//       return await graphqlUserController.getUserById(id)
//     } catch (error) {
//       const err = error as Error
//       return err.message
//     }
//   },

//   async deleteUser({ id }: { id: number }) {
//     if (!id) throw new Error('User ID must be provided!')
//     try {
//       return await graphqlUserController.deleteUser(id)
//     } catch (error) {
//       const err = error as Error
//       return err.message
//     }
//   },
// }

// export const PostResolvers = {
//   async getPosts(): Promise<PostEntity[]> {
//     return (await graphqlPostController.getPosts()) as PostEntity[]
//   },

//   async createPost({ post }: { post: PostEntity }) {
//     console.log('Resolvers createPost post', post)
//     try {
//       return (await graphqlPostController.createPost(post)) as PostEntity
//     } catch (error) {
//       const err = error as Error
//       return err.message
//     }
//   },

//   async updatePost({ post }: { post: PostEntity }) {
//     if (!post?.id) throw new Error('User ID must be provided!')
//     try {
//       return await graphqlPostController.updatePost(post)
//     } catch (error) {
//       const err = error as Error
//       return err.message
//     }
//   },

//   async getPostById({ id }: { id: number }) {
//     if (!id) throw new Error('User ID must be provided!')
//     try {
//       return await graphqlPostController.getPostById(id)
//     } catch (error) {
//       const err = error as Error
//       return err.message
//     }
//   },

//   async deletePost({ id }: { id: number }) {
//     if (!id) throw new Error('User ID must be provided!')
//     try {
//       return await graphqlPostController.deletePost(id)
//     } catch (error) {
//       const err = error as Error
//       return err.message
//     }
//   },

//   async getPostsByTitle({ title }: { title: string }) {
//     if (!title) throw new Error('User ID must be provided!')
//     try {
//       return await graphqlPostController.getPostsByTitle(title)
//     } catch (error) {
//       const err = error as Error
//       return err.message
//     }
//   },
// }

export const resolvers = {
  Query: {
    posts: async () => {
      const result = await graphqlPostController.getPosts()
      return result
    },
    users: async () => {
      const result = await graphqlUserController.getUsers()
      return result
    },
  },
  Mutation: {
    createUser: async (parent: unknown, args: UserEntity) => {
      try {
        if (!args.username || !args.email || !args.password || !args.role) throw new Error('All fields are required!')
        return await graphqlUserController.createUser(args)
      } catch (error) {
        const err = error as Error
        throw new GraphQLError(err.message, {
          extensions: { code: 'BAD_USER_INPUT'},
        });
      }
    },
    updateUser: async (parent: unknown, args: UserEntity) => {
      try {
        const { id } = args
        if (!id) throw new Error('User ID must be provided!')
        if (!args.username && !args.email && !args.password && !args.role) {
          throw new Error('All fields are required!')
        }
        const userId = +id
        return await graphqlUserController.updateUser({ ...args, id: userId})
      } catch (error) {
        const err = error as Error
        throw new GraphQLError(err.message, {
          extensions: { code: 'BAD_USER_INPUT'},
        });
      }
    },
    deleteUser: async (parent: unknown, args: { id: number }) => {
      try {
        const { id } = args
        if (!id) throw new Error('User ID must be provided!')
        return await graphqlUserController.deleteUser(+id)
      } catch (error) {
        const err = error as Error
        throw new GraphQLError(err.message, {
          extensions: { code: 'INTERNAL_SERVER_ERROR'},
        });
      }
    },
    getUserById: async (parent: unknown, args: { id: number }) => {
      try {
        const { id } = args
        if (!id) throw new Error('User ID must be provided!')
        return await graphqlUserController.getUserById(+id)
      } catch (error) {
        const err = error as Error
        throw new GraphQLError(err.message, {
          extensions: { code: 'INTERNAL_SERVER_ERROR'},
        });
      }
    },

    createPost: async (parent: unknown, args: { input: PostEntity }) => {
      console.log('createPost args', args)
      try {
        return await graphqlPostController.createPost(args)
      } catch (error) {
        const err = error as Error
        throw new GraphQLError(err.message, {
          extensions: { code: 'INTERNAL_SERVER_ERROR'},
        });
      }
    },

    updatePost: async (parent: unknown, args: { input: PostEntity }) => {
      console.log('updatePost args', args)
      try {
        return await graphqlPostController.updatePost(args)
      } catch (error) {
        const err = error as Error
        throw new GraphQLError(err.message, {
          extensions: { code: 'INTERNAL_SERVER_ERROR'},
        });
      }
    },

    deletePost: async (parent: unknown, args: { id: number }) => {
      if (!args.id) throw new Error('Post ID must be provided!')
      try {
        return await graphqlPostController.deletePost(args)
      } catch (error) {
        const err = error as Error
        throw new GraphQLError(err.message, {
          extensions: { code: 'INTERNAL_SERVER_ERROR'},
        });
      }
    },

    getPostsByTitle: async (parent: unknown, args: { title: string }) => {
      try {
        return await graphqlPostController.getPostsByTitle(args.title)
      } catch (error) {
        const err = error as Error
        throw err
      }
    }
  },
}