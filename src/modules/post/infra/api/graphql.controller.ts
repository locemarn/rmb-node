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
  private _getPostByTitleUseCase: GetPostsByTitleUseCase
  private _deletePostUseCase: DeletePostUseCase

  constructor() {
    this._prismaRepo = new PostPrismaRepository()
    this._postRepository = new PostRepository(this._prismaRepo)
    this._getPostsUsersUseCase = new GetPostsUseCase(this._postRepository)
    this._createPostUseCase = new CreatePostUseCase(this._postRepository)
    this._updatePostUseCase = new UpdatePostUseCase(this._postRepository)
    this._getPostByIdUseCase = new GetPostByIdUseCase(this._postRepository)
    this._getPostByTitleUseCase = new GetPostsByTitleUseCase(this._postRepository)
    this._deletePostUseCase = new DeletePostUseCase(this._postRepository)
  }
  async getPosts(): Promise<PostEntity[] | string | null> {
    try {
      const response = await this._getPostsUsersUseCase.execute()
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

  async updatePost(post: PostEntity): Promise<PostEntity | IError> {
    if (!post?.id) throw new Error('User id must be provide.')
    console.log('GraphqlPostController updatePost post', post)
    try {
      const hasPost = await this._getPostByIdUseCase.execute(post.id)
      console.log('GraphqlPostController hasPost', hasPost)
      if (!hasPost) throw new Error('Post not found!')

      const response = await this._updatePostUseCase.execute(post.id, post)
      if (!response) throw new Error('Cannot update the Post.')
      return response
    } catch (error) {
      const err = error as Error
      console.log('akiiii', err)
      return err
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
      const response = await this._getPostByTitleUseCase.execute(title)
      return response
    } catch (error) {
      const err = error as Error
      return err.message
    }
  }
}
