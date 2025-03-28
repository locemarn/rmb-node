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
          user: true,
          comments: true,
          likes: true
        }
      })
      return posts as unknown as PostEntity[]
    } catch (error) {
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }

  async create(post: PostEntity): Promise<PostEntity> {
    try {
      const createdPost = await this._prisma.post.create({
        data: {
          title: post.title,
          content: post.content,
          published: post.published,
          userId: +post.userId,
          categories: {
            connect: post.categories.map(id => ({ id: +id }))
          }
        },
        include: {
          categories: true
        }
      })
      return createdPost as unknown as PostEntity
    } catch (error) {
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }

  async update(id: number, post: PostEntity): Promise<PostEntity | null> {
    try {
      const updatedPost = await this._prisma.post.update({
        where: { id: +id },
        data: {
          title: post.title,
          content: post.content,
          published: post.published,
          categories: {
            set: post.categories.map(id => ({ id: +id }))
          }
        },
        include: {
          categories: true
        }
      })
      return updatedPost as unknown as PostEntity
    } catch (error) {
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }

  async delete(id: number): Promise<PostEntity> {
    try {
      const deletedPost = this._prisma.post.delete({
        where: { id: +id },
        include: {
          categories: true,
          comments: true
        }
      })

      const deleteComments = this._prisma.comment.deleteMany({
        where: {
          postId: +id,
        }
      })

      const transaction = await this._prisma.$transaction([deleteComments, deletedPost])
      return transaction[1] as unknown as PostEntity
    } catch (error) {
      const err = error as Error
      throw err
    }
  }

  async getPostById(id: number): Promise<PostEntity> {
    try {
      const post = await this._prisma.post.findUnique({
        where: { id: +id },
        include: {
          categories: true,
          user: true,
          comments: {
            include: {
              user: true,
              response: {
                include: {
                  user: true
                }
              }
            }
          },
          likes: true
        }
      })
      console.log('post', post)
      return post as unknown as PostEntity
    } catch (error) {
      const err = error as Error
      throw err
    }
  }

  async getPostsByTitle(title: string): Promise<PostEntity[]> {
    try {
      const post = await this._prisma.post.findMany({
        where: { title: { contains: title } },
        include: {
          categories: true,
          comments: true,
          user: true
        }
      })
      return post as unknown as PostEntity[]
    } catch (error) {
      const err = error as Error
      throw err
    }
  }
}
