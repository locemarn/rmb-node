import { GraphQLError } from "graphql/error";
import { LikeUsecases } from "../../application/usecases/like.usecases";
import { LikeEntity } from "../../domain/entity/like.entity";
import { LikePrismaRepository } from "../database/prisma/likePrisma.repository";
import { LikeRepository } from "../repository/like.repository";

export class LikeGraphqlController {
  private _prismaRepo: LikePrismaRepository
  private _likeRepo: LikeRepository
  private _likeUseCases: LikeUsecases

  constructor() {
    this._prismaRepo = new LikePrismaRepository()
    this._likeRepo = new LikeRepository(this._prismaRepo)
    this._likeUseCases = new LikeUsecases(this._likeRepo)
  }

  async addLike(postId: number, userId: number): Promise<LikeEntity> {
    if (!postId) throw new Error('Post ID must be provided!')
    if (!userId) throw new Error('User ID must be provided!')
    try {
      return await this._likeUseCases.addLike({postId, userId})
    } catch (error) {
      const err = error as Error
      throw new GraphQLError(err.message, {
        extensions: { code: 'INTERNAL_SERVER_ERROR'},
      });
    }
  }
  
  async removeLike(postId: number, userId: number): Promise<LikeEntity> {
    if (!postId) throw new Error('Post ID must be provided!')
    if (!userId) throw new Error('User ID must be provided!')
    try {
      return await this._likeUseCases.removeLike(postId, userId)
    } catch (error) {
      const err = error as Error
      throw new GraphQLError(err.message, {
        extensions: { code: 'INTERNAL_SERVER_ERROR'},
      });
    }
  }

  async getUserLikes(userId: number): Promise<LikeEntity[]> {
    if (!userId) throw new Error('User ID must be provided!')
    try {
      return await this._likeUseCases.getUserLikes(userId)
    } catch (error) {
      const err = error as Error
      throw new GraphQLError(err.message, {
        extensions: { code: 'INTERNAL_SERVER_ERROR'},
      });
    }
  }
  
}