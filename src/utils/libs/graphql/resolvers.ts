import { GraphQLError } from 'graphql/error'
import { GraphqlPostController } from '../../../modules/post/infra/api/graphql.controller'
import { UserEntity } from '../../../modules/user/domain/entity/user.entity'
import { GraphqlUserController } from '../../../modules/user/infra/api/graphql.controller'
import { PostEntity } from '../../../modules/post/domain/entity/post.entity'
import { CategoryGraphqlController } from '../../../modules/category/infra/api/category.graphql.controller'
import { CommentsGraphqlController } from '../../../modules/comments/infra/api/comments.graphql.controller'
import { CommentEntity } from '../../../modules/comments/domain/entity/comment.entity'

const graphqlUserController = new GraphqlUserController()
const graphqlPostController = new GraphqlPostController()
const graphqlCategoryController = new CategoryGraphqlController()
const graphqlCommentsController = new CommentsGraphqlController()

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
    categories: async () => {
      const result = await graphqlCategoryController.getAllCategories()
      return result
    }
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
        throw new GraphQLError(err.message, {
          extensions: { code: 'INTERNAL_SERVER_ERROR'},
        });
      }
    },
    getPostById: async (parent: unknown, args: { id: number }) => {
      try {
        return await graphqlPostController.getPostById(args.id)
      } catch (error) {
        const err = error as Error
        throw new GraphQLError(err.message, {
          extensions: { code: 'INTERNAL_SERVER_ERROR'},
        });
      }
    },

    createCategory: async (parent: unknown, args: { name: string }) => {
      try {
        return await graphqlCategoryController.createCategory(args)
      } catch (error) {
        const err = error as Error
        throw new GraphQLError(err.message, {
          extensions: { code: 'INTERNAL_SERVER_ERROR'},
        });
      }
    },
    updateCategory: async (parent: unknown, args: { id: number, name: string }) => {
      if (!args.id) throw new Error('Category ID must be provided!')
      try {
        return await graphqlCategoryController.updateCategory(args)
      } catch (error) {
        const err = error as Error
        throw new GraphQLError(err.message, {
          extensions: { code: 'INTERNAL_SERVER_ERROR'},
        });
      }
    },
    deleteCategory: async (parent: unknown, args: { id: number }) => {
      if (!args.id) throw new Error('Category ID must be provided!')
      try {
        return await graphqlCategoryController.deleteCategory(args.id)
      } catch (error) {
        const err = error as Error
        throw new GraphQLError(err.message, {
          extensions: { code: 'INTERNAL_SERVER_ERROR'},
        });
      }
    },
    getCategoryById: async (parent: unknown, args: { id: number }) => { 
      if (!args.id) throw new Error('Category ID must be provided!')
      try {
        return await graphqlCategoryController.getCategoryById(args.id)
      } catch (error) {
        const err = error as Error
        throw new GraphQLError(err.message, {
          extensions: { code: 'INTERNAL_SERVER_ERROR'},
        });
      }
    },

    createComment: async (parent: unknown, args: { input: CommentEntity }) => {
      try {
        return await graphqlCommentsController.createComment(args.input)
      } catch (error) {
        const err = error as Error
        throw new GraphQLError(err.message, {
          extensions: { code: 'INTERNAL_SERVER_ERROR'},
        });
      }
    },
    updateComment: async (parent: unknown, args: { input: CommentEntity }) => {
      if (!args.input.id) throw new Error('Comment ID must be provided!')
      try {
        return await graphqlCommentsController.updateComment(args.input)
      } catch (error) {
        const err = error as Error
        throw new GraphQLError(err.message, { 
          extensions: { code: 'INTERNAL_SERVER_ERROR'},
        });
      }
    },
    deleteComment: async (parent: unknown, args: { id: number }) => {
      if (!args.id) throw new Error('Comment ID must be provided!')
      try {
        return await graphqlCommentsController.deleteComment(args.id)
      } catch (error) {
        const err = error as Error
        throw new GraphQLError(err.message, {
          extensions: { code: 'INTERNAL_SERVER_ERROR'},
        });
      }
    },
    getCommentsByPostId: async (parent: unknown, args: { postId: number }) => {
      if (!args.postId) throw new Error('Post ID must be provided!')
      try {
        return await graphqlCommentsController.getCommentsByPostId(args.postId)
      } catch (error) {
        const err = error as Error
        throw new GraphQLError(err.message, {
          extensions: { code: 'INTERNAL_SERVER_ERROR'},
        });
      }
    },
    getCommentById: async (parent: unknown, args: { id: number }) => {
      if (!args.id) throw new Error('Comment ID must be provided!')
      try {
        return await graphqlCommentsController.getCommentById(args.id)
      } catch (error) {
        const err = error as Error
        throw new GraphQLError(err.message, {
          extensions: { code: 'INTERNAL_SERVER_ERROR'},
        });
      }
    },
  },
}
