import { ResponseEntity } from "../entity/response.entity"

export interface ResponseRepositoryInterface {
  create(response: ResponseEntity): Promise<ResponseEntity>
  update(response: ResponseEntity): Promise<ResponseEntity>
  delete(id: number): Promise<ResponseEntity>
  getResponsesByCommentId(commentId: number): Promise<ResponseEntity[]>
  getResponseById(id: number): Promise<ResponseEntity>
} 