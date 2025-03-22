 
 
 
import { PrismaClient } from '@prisma/client'
import { PostEntity } from '../../../domain/entity/post.entity'
import { PostRepositoryInterface } from '../../../domain/repository/postRepository.interface'
import prisma from '../../../../../infra/lib/prisma/client'
import { ResponseError } from '../../../../../utils/fixtures/errors/responseError'

export class PostPrismaRepository implements PostRepositoryInterface {
  _prisma: PrismaClient

  constructor() {
    this._prisma = prisma
  }
  async getPosts(): Promise<PostEntity[]> {
    try {
      if (!this._prisma.post) {
        throw new Error('Prisma client is not initialized')
      }
      return (await this._prisma.post.findMany({
        orderBy: {
          created_at: 'desc',
        },
      })) as unknown as PostEntity[]
    } catch (error: unknown) {
      console.log('error', error)
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }
  async create(post: PostEntity): Promise<PostEntity> {
    try {
      if (!this._prisma.post) {
        throw new Error('Prisma client is not initialized')
      }
      const createdPost = await this._prisma.post.create({
        data: {
          title: post.title,
          content: post.content,
          author: {
            connect: {
              id: post.author,
            },
          },
        },
      })
      return {
        id: createdPost.id,
        created_at: createdPost.created_at,
        updated_at: createdPost.updated_at,
        title: createdPost.title,
        content: createdPost.content,
        author: createdPost.authorId,
      } as PostEntity
    } catch (error) {
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }
  async update(id: number, post: PostEntity): Promise<PostEntity | null> {
    try {
      if (!id) throw new Error('id required for update.')
      const updatedPost = await this._prisma.post.update({
        where: { id },
        data: {
          title: post.title,
          content: post.content,
          authorId: post.author,
          updated_at: new Date(),
        },
      })
      return {
        id: updatedPost.id,
        created_at: updatedPost.created_at,
        updated_at: updatedPost.updated_at,
        title: updatedPost.title,
        content: updatedPost.content,
        author: updatedPost.authorId,
      } as PostEntity
    } catch (error: unknown) {
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }
  async delete(id: number): Promise<PostEntity | null> {
    try {
      if (!id) throw new Error('id required for delete.')
      const post = await this._prisma.post.delete({
        where: { id },
      })
      return {
        id: post.id,
        created_at: post.created_at,
        updated_at: post.updated_at,
        title: post.title,
        content: post.content,
        author: post.authorId,
      } as PostEntity
    } catch (error) {
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }

  async getPostById(id: number): Promise<PostEntity> {
    try {
      if (!id) throw new Error('Invalid user id.')
      const post = await this._prisma.post.findUnique({
        where: { id },
      })
      if (!post) throw new Error('Invalid post id.')
      return {
        id: post.id,
        created_at: post.created_at,
        updated_at: post.updated_at,
        title: post.title,
        content: post.content,
        author: post.authorId,
      } as PostEntity
    } catch (error) {
      // console.error('UserPrismaRepository - Error fetching user by id:')
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }
  async getPostByTitle(title: string): Promise<PostEntity[]> {
    try {
      const posts = await this._prisma.post.findMany({
        where: {
          title: { contains: title },
        },
      })
      return posts as unknown as PostEntity[]
    } catch (error) {
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }
}
