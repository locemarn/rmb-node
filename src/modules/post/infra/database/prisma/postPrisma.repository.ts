import { PrismaClient } from '@prisma/client'
import prisma from '../../../../../infra/libs/prisma/client'
import { PostRepositoryInterface } from '../../../domain/repository/postRepository.interface'
import { PostEntity } from '../../../domain/entity/post.entity'
import { ResponseError } from '../../../../../utils/fixtures/errors/responseError'

export class PostPrismaRepository implements PostRepositoryInterface {
  _prisma: PrismaClient

  constructor() {
    this._prisma = prisma
  }

  async getPosts(): Promise<PostEntity[]> {
    try {
      const posts = await this._prisma.post.findMany({
        include: {
          categories: true,
          User: true,
        },
      })
      return posts as unknown as PostEntity[]
    } catch (error) {
      if (error instanceof Error) {
        throw new ResponseError(error.message)
      } else {
        throw new ResponseError('An unknown error occurred')
      }
    }
  }
  
  async create(post: PostEntity): Promise<PostEntity> {
    try {
      const createdPost = await this._prisma.post.create({
        data: {
          title: post.title,
          content: post.content,
          userId: post.authorId,
          categories: {
            connect: post.categories.map((category) => ({
              id: category,
            })),
          },
        },
      })
      return createdPost as unknown as PostEntity
    } catch (error) {
      if (error instanceof Error) {
        throw new ResponseError(error.message)
      } else {
        throw new ResponseError('An unknown error occurred')
      }
    }
  }

  async update(id: number, post: PostEntity): Promise<PostEntity | null> {
    try {
      const updatedPost = await this._prisma.post.update({
        where: { id },
        data: {
          title: post.title,
          content: post.content,
          userId: post.authorId,
          published: post.published,
          updated_at: new Date()
        },
      })
      if (!updatedPost) throw new Error('Post not found')
      return updatedPost as unknown as PostEntity
    } catch (error) {
      if (error instanceof Error) {
        throw new ResponseError(error.message)
      } else {
        throw new ResponseError('An unknown error occurred')
      }
    }
  }

  async delete(id: number): Promise<PostEntity> {
    console.log('PostPrismaRepository delete', id)
    try {
      const deletedPost = await this._prisma.post.delete({
        where: { id },
      })
      return deletedPost as unknown as PostEntity
    } catch (error) {
      if (error instanceof Error) {
        throw new ResponseError(error.message)
      } else {
        throw new ResponseError('An unknown error occurred')
      }
    }
  }

  async getPostById(id: number): Promise<PostEntity> {
    const post = await this._prisma.post.findUnique({
      where: { id },
    })
    return post as unknown as PostEntity
  }

  async getPostByTitle(title: string): Promise<PostEntity[]> {
    try {
      const posts = await this._prisma.post.findMany({
        where: { title: { contains: title } },
        select: {
          id: true,
          title: true,
          content: true,
          published: true,
          created_at: true,
          categories: {
            select: {
              name: true,
            },
          },
        },
      })
      console.log('PostPrismaRepository posts', JSON.stringify(posts, null, 2))
      const p = posts.map((post) => { 
        console.log('post', JSON.stringify(post, null, 2))
        return {
          ...post,
          categories: post.categories.map((category) => category.name),
        }
      })
      return p as unknown as PostEntity[]
    } catch (error) {
      const err = error as Error
      throw err
    }
  }
}
