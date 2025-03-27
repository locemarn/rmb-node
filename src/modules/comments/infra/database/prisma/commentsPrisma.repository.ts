import { PrismaClient } from '@prisma/client'
import prisma from '../../../../../infra/libs/prisma/client'
import { CommentsRepositoryInterface } from '../../../domain/repository/commentsRepository.interface'
import { CommentEntity } from '../../../domain/entity/comment.entity'

export class CommentsPrismaRepository implements CommentsRepositoryInterface {
  private readonly _prisma: PrismaClient

  constructor() {
    this._prisma = prisma
  }
  async create(comment: CommentEntity): Promise<CommentEntity> {
    try {
      const createdComment = await this._prisma.comment.create({
        data: {
          content: comment.content,
          postId: +comment.postId,
          userId: +comment.userId,
        },
      })
      return createdComment as unknown as CommentEntity
    } catch (error) {
      const err = error as Error
      throw err
    }
  }
  async update(comment: CommentEntity): Promise<CommentEntity> {
    if (!comment.id) throw new Error('Comment ID must be provided!')
    try {
      const updatedComment = await this._prisma.comment.update({
        where: { id: +comment.id },
        data: { content: comment.content, updated_at: new Date() },
      })
      return updatedComment as unknown as CommentEntity
    } catch (error) {
      const err = error as Error
      throw err
    }
  }
  async delete(id: number): Promise<CommentEntity> {
    try {
      const deletedComment = await this._prisma.comment.delete({
        where: { id: +id },
      })
      return deletedComment as unknown as CommentEntity
    } catch (error) {
      const err = error as Error
      throw err
    }
  }
  async getCommentsByPostId(postId: number): Promise<CommentEntity[]> {
    try {
      const comments = await this._prisma.comment.findMany({
        where: { postId: +postId },
        include: {
          response: true
        },
      })
      return comments as unknown as CommentEntity[]
    } catch (error) {
      const err = error as Error
      throw err
    }
  }
  async getCommentById(id: number): Promise<CommentEntity> {
    try {
      const comment = await this._prisma.comment.findUnique({
        where: { id: +id },
        include: {
          response: true,
        },
      })
      return comment as unknown as CommentEntity
    } catch (error) {
      const err = error as Error
      throw err
    }
  }
}
  
