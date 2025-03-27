import { ResponseEntity } from "../../domain/entity/response.entity"
import { ResponseRepository } from "../../infra/repository/response.repository"

export class ResponseUsecases {
  private _repository: ResponseRepository

  constructor(repository: ResponseRepository) {
    this._repository = repository
  }

  async createResponse(response: ResponseEntity): Promise<ResponseEntity> {
    return this._repository.createResponse(response)
  }

  async updateResponse(response: ResponseEntity): Promise<ResponseEntity> {
    return this._repository.updateResponse(response)
  }

  async deleteResponse(id: number): Promise<ResponseEntity> {
    return this._repository.deleteResponse(id)
  }

  async getResponsesByCommentId(commentId: number): Promise<ResponseEntity[]> {
    return this._repository.getResponsesByCommentId(commentId)
  }

  async getResponseById(id: number): Promise<ResponseEntity> {
    return this._repository.getResponseById(id)
  }
} 