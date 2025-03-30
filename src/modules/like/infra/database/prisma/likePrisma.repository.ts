import { LikeEntity } from "../../../domain/entity/like.entity";
import { LikeRepositoryInterface } from "../../../domain/repository/likeRepository.interface";
import { Prisma } from "@prisma/client";
import { ResponseError } from "../../../../../utils/fixtures/errors/responseError";
import { LikeRepositoryValidationError } from "../../../../../utils/fixtures/errors/LikeRepositoryValidationError";
import { LikeNotFoundError } from "../../../../../utils/fixtures/errors/LikeNotFoundError";
import prisma from "../../../../../infra/libs/prisma/client";


export class LikePrismaRepository implements LikeRepositoryInterface {

  constructor(private readonly _prisma: typeof prisma) {}

  async getUserLikes(userId: number): Promise<LikeEntity[]> {
    try {
      const likes = await this._prisma.like.findMany({
        where: {
          userId: +userId
        }
      });
      return likes as unknown as LikeEntity[];
    } catch (error) {
      throw new ResponseError(`Failed to fetch likes for user ${userId}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async addLike(like: LikeEntity): Promise<LikeEntity> {
    try {
      const createdLike = await this._prisma.like.create({
        data: {
          userId: +like.userId,
          postId: +like.postId,
        }
      });
      return createdLike as unknown as LikeEntity;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
             throw new ResponseError(`User ${like.userId} already liked post ${like.postId}`, 409); 
        }
      }
        // Log the original error
        // logger.error("Error adding like:", error);
        throw new ResponseError(`Failed to add like for user ${like.userId} on post ${like.postId}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async removeLike(postId: number, userId: number): Promise<LikeEntity> {
    if (!postId) throw new LikeRepositoryValidationError('Post ID must be provided!');
    if (!userId) throw new LikeRepositoryValidationError('User ID must be provided!');
    try {
      const like = await this._prisma.like.findFirst({
        where: { postId: +postId, userId: +userId }
      });
      if (!like) throw new LikeNotFoundError(postId, userId);
      
      const deletedLike = await this._prisma.like.delete({
        where: { id: like.id }
      });
      return deletedLike as unknown as LikeEntity;
    } catch (error) {
      if (error instanceof LikeNotFoundError || error instanceof LikeRepositoryValidationError) {
        throw error;
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
              throw new LikeNotFoundError(postId, userId);
          }
      }

      // Log the original error
      // logger.error(`Error removing like for post ${postId}, user ${userId}:`, error);
      throw new ResponseError(`Failed to remove like for post ${postId}, user ${userId}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}