import { ResponseEntity } from "../../domain/entity/response.entity"
import { ResponseRepositoryInterface } from "../../domain/repository/responseRepository.interface"

export class ResponseRepository {
  private _repository: ResponseRepositoryInterface

  constructor(repository: ResponseRepositoryInterface) {
    this._repository = repository
  }

  async createResponse(response: ResponseEntity): Promise<ResponseEntity> {
    try {
      const createdResponse = await this._repository.create(response)
      return createdResponse
    } catch (error) {
      const err = error as Error
      throw err
    }
  }

  async updateResponse(response: ResponseEntity): Promise<ResponseEntity> {
    try {
      const updatedResponse = await this._repository.update(response)
      return updatedResponse
    } catch (error) {
      const err = error as Error
      throw err
    }
  }

  async deleteResponse(id: number): Promise<ResponseEntity> {
    try {
      const deletedResponse = await this._repository.delete(id)
      return deletedResponse
    } catch (error) {
      const err = error as Error
      throw err
    }
  }

  async getResponsesByCommentId(commentId: number): Promise<ResponseEntity[]> {
    try {
      const responses = await this._repository.getResponsesByCommentId(commentId)
      return responses
    } catch (error) {
      const err = error as Error
      throw err
    }
  }

  async getResponseById(id: number): Promise<ResponseEntity> {
    try {
      const response = await this._repository.getResponseById(id)
      return response
    } catch (error) {
      const err = error as Error
      throw err
    }
  }
} 