import { GetPostsUseCase } from '../../application/usecases/getPosts.usecase'
import { PostRepository } from '../repository/post.repository'
import { PostRepositoryInterface } from '../../domain/repository/postRepository.interface'
import { PostPrismaRepository } from '../database/prisma/postPrisma.repository'
import { PostEntity } from '../../domain/entity/post.entity'
import { CreatePostUseCase } from '../../application/usecases/createPost.usecase'
import { UpdatePostUseCase } from '../../application/usecases/updatePost.usecase'
import { GetPostByIdUseCase } from '../../application/usecases/getPostById.usecase'
import { DeletePostUseCase } from '../../application/usecases/deletePost.usecase'

interface IError {
  name: string
  message: string
  stack?: string
}

export class GraphqlPostController {
  private _prismaRepo: PostRepositoryInterface
  private _postRepository: PostRepository
  private _postUsersUseCase: GetPostsUseCase
  private _createPostUseCase: CreatePostUseCase
  private _updatePostUseCase: UpdatePostUseCase
  private _getPostByIdUseCase: GetPostByIdUseCase
  private _deletePostUseCase: DeletePostUseCase

  constructor() {
    this._prismaRepo = new PostPrismaRepository()
    this._postRepository = new PostRepository(this._prismaRepo)
    this._postUsersUseCase = new GetPostsUseCase(this._postRepository)
    this._createPostUseCase = new CreatePostUseCase(this._postRepository)
    this._updatePostUseCase = new UpdatePostUseCase(this._postRepository)
    this._getPostByIdUseCase = new GetPostByIdUseCase(this._postRepository)
    this._deletePostUseCase = new DeletePostUseCase(this._postRepository)
  }
  async getPosts(): Promise<PostEntity[] | string | null> {
    try {
      const response = await this._postUsersUseCase.execute()
      return response
    } catch (error) {
      const err = error as Error
      return err.message
    }
  }

  async createPost(post: PostEntity): Promise<PostEntity | IError> {
    try {
      const response = await this._createPostUseCase.execute(post)
      return response
    } catch (error) {
      const err = error as Error
      console.log('GraphqlUserController err.name', err.name)
      console.log('GraphqlUserController err.message', err.message)
      console.log('GraphqlUserController err.stack', err.stack)
      return err
    }
  }

  async updatePost(post: PostEntity): Promise<PostEntity | string | null> {
    if (!post?.id) throw new Error('User id must be provide.')
    try {
      const response = await this._updatePostUseCase.execute(post.id, post)
      return response
    } catch (error) {
      const err = error as Error
      return err.message
    }
  }

  async deletePost(id: number): Promise<PostEntity | string | null> {
    if (!id) throw new Error('User id must be provide.')
    try {
      const response = await this._deletePostUseCase.execute(id)
      return response
    } catch (error) {
      const err = error as Error
      return err.message
    }
  }

  async getPostById(id: number): Promise<PostEntity | string | null> {
    if (!id) throw new Error('User id must be provide.')
    try {
      const response = await this._getPostByIdUseCase.execute(id)
      return response
    } catch (error) {
      const err = error as Error
      return err.message
    }
  }

  async getPostsByTitle(title: string): Promise<PostEntity[] | string | null> {
    if (!title) throw new Error('User id must be provide.')
    try {
      const response = await this._postRepository.getPostsByTitle(title)
      return response
    } catch (error) {
      const err = error as Error
      return err.message
    }
  }
}
