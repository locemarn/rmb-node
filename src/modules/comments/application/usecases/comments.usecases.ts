import { CommentEntity } from "../../domain/entity/comment.entity"
import { CommentRepository } from "../../infra/repository/comment.repository"

export class CommentsUsecases {
  private _repository: CommentRepository

  constructor(repository: CommentRepository) {
    this._repository = repository
  }

  async createComment(comment: CommentEntity): Promise<CommentEntity> {
    return this._repository.createComment(comment)
  }

  async updateComment(comment: CommentEntity): Promise<CommentEntity> {
    return this._repository.updateComment(comment)
  }

  async deleteComment(id: number): Promise<CommentEntity> {
    return this._repository.deleteComment(id)
  }

  async getCommentsByPostId(postId: number): Promise<CommentEntity[]> {
    return this._repository.getCommentsByPostId(postId)
  }

  async getCommentById(id: number): Promise<CommentEntity> {
    return this._repository.getCommentById(id)
  }
  
}