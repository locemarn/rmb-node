import { LikeInputValidationError } from "../../../../utils/fixtures/errors/LikeInputValidationError";
import { LikeEntity } from "../../domain/entity/like.entity";
import { LikeRepositoryInterface } from "../../domain/repository/likeRepository.interface";

export class LikeRepository {
  private readonly _repository: LikeRepositoryInterface;
  
  constructor(repository: LikeRepositoryInterface) {
    this._repository = repository
  }

  
  /**
   * Adds a like, ensuring required fields are present.
   * Delegates the actual operation to the injected repository.
   * @param like - The like entity to add.
   * @throws {LikeInputValidationError} if userId or postId is missing.
   * @throws {Error} other errors propagated from the underlying repository.
   * @returns The created LikeEntity.
   */
  async addLike(like: LikeEntity): Promise<LikeEntity> {
    if (!like?.userId || !like?.postId) {
      throw new LikeInputValidationError('User ID and Post ID are required to add a like.');
    }
    return await this._repository.addLike(like)
  }

  /**
   * Removes a like.
   * Delegates the operation to the injected repository.
   * (Assumes underlying repository handles validation for existence/non-null IDs)
   * @param postId - The ID of the post.
   * @param userId - The ID of the user.
   * @throws {Error} errors propagated from the underlying repository.
   * @returns The removed LikeEntity.
   */
  async removeLike(postId: number, userId: number): Promise<LikeEntity> {
    if (postId === undefined || postId === null || userId === undefined || userId === null) {
      throw new LikeInputValidationError('Post ID and User ID are required to remove a like.');
    }
    return await this._repository.removeLike(postId, userId)
  }

  /**
   * Gets all likes for a specific user.
   * Delegates the operation to the injected repository.
   * @param userId - The ID of the user.
   * @throws {LikeInputValidationError} if userId is missing.
   * @throws {Error} other errors propagated from the underlying repository.
   * @returns An array of LikeEntity objects.
   */
  async getUserLikes(userId: number): Promise<LikeEntity[]> {
    if (userId === undefined || userId === null) {
      throw new LikeInputValidationError('User ID is required to get user likes.');
    }
    return await this._repository.getUserLikes(userId)
  }
} 