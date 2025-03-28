import { LikeEntity } from "../../domain/entity/like.entity";
import { LikeRepositoryInterface } from "../../domain/repository/likeRepository.interface";

export class LikeUsecases {
  private _repository: LikeRepositoryInterface

  constructor(repository: LikeRepositoryInterface) {
    this._repository = repository
  }

  async addLike(like: LikeEntity): Promise<LikeEntity> {
    return await this._repository.addLike(like)
  }

  async removeLike(postId: number, userId: number): Promise<LikeEntity> {
    return await this._repository.removeLike(postId, userId)
  }

  async getUserLikes(userId: number): Promise<LikeEntity[]> {
    return await this._repository.getUserLikes(userId)
  }
}