import { CommentsUsecases } from "../../application/usecases/comments.usecases"
import { CommentEntity } from "../../domain/entity/comment.entity"
import { CommentsPrismaRepository } from "../database/prisma/commentsPrisma.repository"
import { CommentRepository } from "../repository/comment.repository"

export class CommentsGraphqlController {
  private _prismaRepo: CommentsPrismaRepository
  private _commentRepo: CommentRepository
  private _commentUsecases: CommentsUsecases

  constructor() {
    this._prismaRepo = new CommentsPrismaRepository()
    this._commentRepo = new CommentRepository(this._prismaRepo)
    this._commentUsecases = new CommentsUsecases(this._commentRepo)
  }

  async createComment(comment: CommentEntity): Promise<CommentEntity> {
    return this._commentUsecases.createComment(comment)
  }

  async updateComment(comment: CommentEntity): Promise<CommentEntity> {
    return this._commentUsecases.updateComment(comment)
  }

  async deleteComment(id: number): Promise<CommentEntity> {
    return this._commentUsecases.deleteComment(id)
  }

  async getCommentsByPostId(postId: number): Promise<CommentEntity[]> {
    return this._commentUsecases.getCommentsByPostId(postId)
  }

  async getCommentById(id: number): Promise<CommentEntity> {
    return this._commentUsecases.getCommentById(id)
  }
}