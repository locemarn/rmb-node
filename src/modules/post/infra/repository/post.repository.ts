import { ResponseError } from '../../../../utils/fixtures/errors/responseError'
import { PostEntity } from '../../domain/entity/post.entity'
import { PostRepositoryInterface } from '../../domain/repository/postRepository.interface'

export class PostRepository {
  private _repository: PostRepositoryInterface

  constructor(repository: PostRepositoryInterface) {
    this._repository = repository
  }

  async getAllPosts(): Promise<PostEntity[]> {
    try {
      const posts = await this._repository.getPosts()
      return posts
    } catch (error) {
      const err = error as Error
      // change kind of error here
      throw new ResponseError(err.message)
    }
  }

  async createPost(post: PostEntity): Promise<PostEntity> {
    console.log('PostRepository createPost post', post)
    try {
      return await this._repository.create(post)
    } catch (error) {
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }

  async updatePost(id: number, post: PostEntity): Promise<PostEntity | null> {
    console.log('PostRepository updatePost post', post)
    try {
      if (!id) throw new Error('id required for update.')
      return await this._repository.update(id, post)
    } catch (error) {
      const err = error as Error
      throw err
    }
  }

  async deletePost(id: number): Promise<PostEntity | null> {
    try {
      if (!id) throw new Error('id required for delete.')
      return await this._repository.delete(id)
    } catch (error) {
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }

  async getPostById(id: number): Promise<PostEntity> {
    try {
      if (!id) throw new Error('Invalid user id.')
      const post = await this._repository.getPostById(id)
      // if (!post) throw new Error('Post not found.')
      return post
    } catch (error) {
      const err = error as Error
      console.log('PostRepository getPostById error getPostById', err.message)
      throw err
      // throw new ResponseError(err.message)
    }
  }

  async getPostsByTitle(title: string): Promise<PostEntity[]> {
    try {
      if (!title) throw new Error('Invalid title.')
      const post = await this._repository.getPostByTitle(title)
      return post
    } catch (error) {
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }
}
