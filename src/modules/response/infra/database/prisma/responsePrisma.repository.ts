import { PrismaClient } from '@prisma/client'
import prisma from '../../../../../infra/libs/prisma/client'
import { ResponseRepositoryInterface } from '../../../domain/repository/responseRepository.interface'
import { ResponseEntity } from '../../../domain/entity/response.entity'
import { ResponseError } from '../../../../../utils/fixtures/errors/responseError'

export class ResponsePrismaRepository implements ResponseRepositoryInterface {
  _prisma: PrismaClient

  constructor() {
    this._prisma = prisma
  }

  async create(response: ResponseEntity): Promise<ResponseEntity> {
    try {
      const createdResponse = await this._prisma.commentResponse.create({
        data: {
          content: response.content,
          commentId: +response.commentId,
          userId: +response.userId,
        }
      })
      return createdResponse as unknown as ResponseEntity
    } catch (error) {
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }

  async update(response: ResponseEntity): Promise<ResponseEntity> {
    if (!response.id) throw new ResponseError('Response ID must be provided!')
    try {
      const updatedResponse = await this._prisma.commentResponse.update({
        where: { id: +response.id },
        data: { content: response.content, updated_at: new Date() }
      })
      return updatedResponse as unknown as ResponseEntity
    } catch (error) {
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }

  async delete(id: number): Promise<ResponseEntity> {
    try {
      const deletedResponse = await this._prisma.commentResponse.delete({
        where: { id: +id }
      })
      return deletedResponse as unknown as ResponseEntity
    } catch (error) {
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }

  async getResponsesByCommentId(commentId: number): Promise<ResponseEntity[]> {
    try {
      const responses = await this._prisma.commentResponse.findMany({
        where: { commentId: +commentId },
        include: {
          comments: true,
        },
      })
      return responses as unknown as ResponseEntity[]
    } catch (error) {
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }

  async getResponseById(id: number): Promise<ResponseEntity> {
    try {
      const response = await this._prisma.commentResponse.findUnique({
        where: { id: +id }
      })
      if (!response) {
        throw new ResponseError('Response not found')
      }
      return response as unknown as ResponseEntity
    } catch (error) {
      const err = error as Error
      throw new ResponseError(err.message)
    }
  }
} 