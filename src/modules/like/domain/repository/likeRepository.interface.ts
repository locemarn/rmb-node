import { LikeEntity } from "../entity/like.entity";

export interface LikeRepositoryInterface {
  addLike(like: LikeEntity): Promise<LikeEntity>
  removeLike(postId: number, userId: number): Promise<LikeEntity>
  getUserLikes(userId: number): Promise<LikeEntity[]>
}