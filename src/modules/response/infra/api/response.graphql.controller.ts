import { ResponseUsecases } from "../../application/usecases/response.usecases"
import { ResponseEntity } from "../../domain/entity/response.entity"
import { ResponsePrismaRepository } from "../database/prisma/responsePrisma.repository"
import { ResponseRepository } from "../repository/response.repository"

export class ResponseGraphqlController {
  private _prismaRepo: ResponsePrismaRepository
  private _responseRepo: ResponseRepository
  private _responseUsecases: ResponseUsecases

  constructor() {
    this._prismaRepo = new ResponsePrismaRepository()
    this._responseRepo = new ResponseRepository(this._prismaRepo)
    this._responseUsecases = new ResponseUsecases(this._responseRepo)
  }

  async createResponse(response: ResponseEntity): Promise<ResponseEntity> {
    return this._responseUsecases.createResponse(response)
  }

  async updateResponse(response: ResponseEntity): Promise<ResponseEntity> {
    return this._responseUsecases.updateResponse(response)
  }

  async deleteResponse(id: number): Promise<ResponseEntity> {
    return this._responseUsecases.deleteResponse(id)
  }

  async getResponsesByCommentId(commentId: number): Promise<ResponseEntity[]> {
    return this._responseUsecases.getResponsesByCommentId(commentId)
  }

  async getResponseById(id: number): Promise<ResponseEntity> {
    return this._responseUsecases.getResponseById(id)
  }
} 