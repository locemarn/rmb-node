import { LikeEntity } from "../../domain/entity/like.entity";
import { LikeRepositoryInterface } from "../../domain/repository/likeRepository.interface";

export class LikeRepository {
  private _repository: LikeRepositoryInterface
  
  constructor(repository: LikeRepositoryInterface) {
    this._repository = repository
  }

  async addLike(like: LikeEntity): Promise<LikeEntity> {
    try {
      return await this._repository.addLike(like)
    } catch (error) {
      const err = error as Error
      throw err
    }
  }

  async removeLike(postId: number, userId: number): Promise<LikeEntity> {
    try {
      return await this._repository.removeLike(postId, userId)
    } catch (error) {
      const err = error as Error
      throw err
    }
  }

  async getUserLikes(userId: number): Promise<LikeEntity[]> {
    try {
      return await this._repository.getUserLikes(userId)
    } catch (error) {
      const err = error as Error
      throw err
    }
  }
} 