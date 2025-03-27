import { CommentEntity } from "../entity/comment.entity";

export interface CommentsRepositoryInterface {
  create(comment: CommentEntity): Promise<CommentEntity>
  update(comment: CommentEntity): Promise<CommentEntity>
  delete(id: number): Promise<CommentEntity>
  getCommentsByPostId(postId: number): Promise<CommentEntity[]>
  getCommentById(id: number): Promise<CommentEntity>
}