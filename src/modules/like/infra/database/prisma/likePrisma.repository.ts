import { LikeEntity } from "../../../domain/entity/like.entity";
import { LikeRepositoryInterface } from "../../../domain/repository/likeRepository.interface";
import { PrismaClient } from "@prisma/client";
import prisma from '../../../../../infra/libs/prisma/client';
import { ResponseError } from '../../../../../utils/fixtures/errors/responseError';

export class LikePrismaRepository implements LikeRepositoryInterface {
  private _prisma: PrismaClient;

  constructor() {
    this._prisma = prisma;
  }
  async getUserLikes(userId: number): Promise<LikeEntity[]> {
    try {
      const likes = await this._prisma.like.findMany({
        where: {
          userId: +userId
        }
      });
      return likes as unknown as LikeEntity[];
    } catch (error) {
      const err = error as Error;
      throw new ResponseError(err.message);
    }
  }

  async addLike(like: LikeEntity): Promise<LikeEntity> {
    console.log('like', like);
    try {
      const createdLike = await this._prisma.like.create({
        data: {
          userId: +like.userId,
          postId: +like.postId,
        }
      });
      return createdLike as unknown as LikeEntity;
    } catch (error) {
      const err = error as Error;
      throw new ResponseError(err.message);
    }
  }

  async removeLike(postId: number, userId: number): Promise<LikeEntity> {
    if (!postId) throw new Error('Post ID must be provided!');
    if (!userId) throw new Error('User ID must be provided!');
    try {
      const like = await this._prisma.like.findFirst({
        where: { postId: +postId, userId: +userId }
      });
      if (!like) throw new Error('Like not found');
      
      const deletedLike = await this._prisma.like.delete({
        where: { id: like.id }
      });
      return deletedLike as unknown as LikeEntity;
    } catch (error) {
      const err = error as Error;
      throw new ResponseError(err.message);
    }
  }
}