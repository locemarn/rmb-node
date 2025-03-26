import { GetPostsUseCase } from '../../application/usecases/getPosts.usecase'
import { PostRepository } from '../repository/post.repository'
import { PostRepositoryInterface } from '../../domain/repository/postRepository.interface'
import { PostEntity } from '../../domain/entity/post.entity'
import { CreatePostUseCase } from '../../application/usecases/createPost.usecase'
import { UpdatePostUseCase } from '../../application/usecases/updatePost.usecase'
import { GetPostByIdUseCase } from '../../application/usecases/getPostById.usecase'
import { DeletePostUseCase } from '../../application/usecases/deletePost.usecase'
import { PostPrismaRepository } from '../database/prisma/postPrisma.repository'
import { GetPostsByTitleUseCase } from '../../application/usecases/getPostsByTitle.usecase'

interface IError {
  name: string
  message: string
  stack?: string
}

export class GraphqlPostController {
  private _prismaRepo: PostRepositoryInterface
  private _postRepository: PostRepository
  private _getPostsUsersUseCase: GetPostsUseCase
  private _createPostUseCase: CreatePostUseCase
  private _updatePostUseCase: UpdatePostUseCase
  private _getPostByIdUseCase: GetPostByIdUseCase
  private _getPostsByTitleUseCase: GetPostsByTitleUseCase
  private _deletePostUseCase: DeletePostUseCase

  constructor() {
    this._prismaRepo = new PostPrismaRepository()
    this._postRepository = new PostRepository(this._prismaRepo)
    this._getPostsUsersUseCase = new GetPostsUseCase(this._postRepository)
    this._createPostUseCase = new CreatePostUseCase(this._postRepository)
    this._updatePostUseCase = new UpdatePostUseCase(this._postRepository)
    this._getPostByIdUseCase = new GetPostByIdUseCase(this._postRepository)
    this._getPostsByTitleUseCase = new GetPostsByTitleUseCase(this._postRepository)
    this._deletePostUseCase = new DeletePostUseCase(this._postRepository)
  }
  async getPosts(): Promise<PostEntity[]> {
    try {
      const response = await this._getPostsUsersUseCase.execute()
      return response
    } catch (error) {
      const err = error as Error
      throw err
    }
  }

  async createPost({input}: {input: PostEntity}): Promise<PostEntity | IError> {
    console.log('GraphqlPostController createPost post', input)
    try {
      const response = await this._createPostUseCase.execute(input)
      return response
    } catch (error) {
      const err = error as Error
      return err
    }
  }

  async updatePost({input}: {input: PostEntity}): Promise<PostEntity | IError> {
    if (!input?.id) throw new Error('User id must be provide.')
    console.log('GraphqlPostController updatePost post', input)
    try {
      const hasPost = await this._getPostByIdUseCase.execute(input.id)
      console.log('GraphqlPostController hasPost', hasPost)
      if (!hasPost) throw new Error('Post not found!')

      const response = await this._updatePostUseCase.execute(input.id, input)
      if (!response) throw new Error('Cannot update the Post.')
      return response
    } catch (error) {
      const err = error as Error
      throw err
    }
  }

  async deletePost({id}: {id: number}): Promise<PostEntity | string | null> {
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
      const response = await this._getPostsByTitleUseCase.execute(title)
      return response
    } catch (error) {
      const err = error as Error
      return err.message
    }
  }
}
