import { CommentEntity } from "../../domain/entity/comment.entity"
import { CommentsRepositoryInterface } from "../../domain/repository/commentsRepository.interface"

export class CommentRepository {
  private _repository: CommentsRepositoryInterface

  constructor(repository: CommentsRepositoryInterface) {
    this._repository = repository
  }

  async createComment(comment: CommentEntity): Promise<CommentEntity> {
    try {
      const createdComment = await this._repository.create(comment)
      return createdComment
    } catch (error) {
      const err = error as Error
      throw err
    }
  }

  async updateComment(comment: CommentEntity): Promise<CommentEntity> {
    try {
      const updatedComment = await this._repository.update(comment)
      return updatedComment
    } catch (error) {
      const err = error as Error
      throw err
    }
  }

  async deleteComment(id: number): Promise<CommentEntity> {
    try {
      const deletedComment = await this._repository.delete(id)
      return deletedComment
    } catch (error) {
      const err = error as Error
      throw err
    }
  }

  async getCommentsByPostId(postId: number): Promise<CommentEntity[]> {
    try {
      const comments = await this._repository.getCommentsByPostId(postId)
      return comments
    } catch (error) {
      const err = error as Error
      throw err
    }
  }

  async getCommentById(id: number): Promise<CommentEntity> {
    try {
      const comment = await this._repository.getCommentById(id)
      return comment
    } catch (error) {
      const err = error as Error
      throw err
    }
  }
  
}