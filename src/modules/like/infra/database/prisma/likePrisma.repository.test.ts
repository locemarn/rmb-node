/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { LikeEntity } from '../../../domain/entity/like.entity'
import { PrismaClient, Prisma } from '@prisma/client'
import { ResponseError } from '../../../../../utils/fixtures/errors/responseError' // Adjust path
import { LikePrismaRepository } from './likePrisma.repository'
import { LikeRepositoryValidationError } from '../../../../../utils/fixtures/errors/LikeRepositoryValidationError'
import { LikeNotFoundError } from '../../../../../utils/fixtures/errors/LikeNotFoundError'

// Create a type for our mock Prisma Client for better type safety in tests
interface MockPrismaClient {
  like: {
    findMany: jest.Mock
    create: jest.Mock
    findFirst: jest.Mock
    delete: jest.Mock
  }
}

describe('LikePrismaRepository', () => {
  let likeRepository: LikePrismaRepository
  let mockPrismaClient: MockPrismaClient

  beforeEach(() => {
    // Create a mock Prisma Client object
    mockPrismaClient = {
      like: {
        findMany: jest.fn().mockResolvedValue([]),
        create: jest.fn().mockResolvedValue({}),
        findFirst: jest.fn().mockResolvedValue(null),
        delete: jest.fn().mockResolvedValue({}),
      },
    }

    // Instantiate the repository, injecting the mock client
    likeRepository = new LikePrismaRepository(
      mockPrismaClient as unknown as PrismaClient
    )

    // Clear mocks before each test
    jest.clearAllMocks()
  })

  describe('getUserLikes', () => {
    it('should return an array of LikeEntity objects when likes are found', async () => {
      const userId = 1
      const mockLikesDb = [
        { id: 1, userId: 1, postId: 10, created_at: new Date() },
        { id: 2, userId: 1, postId: 20, created_at: new Date() },
      ]
      const expectedLikes: LikeEntity[] = mockLikesDb as LikeEntity[]

      mockPrismaClient.like.findMany.mockResolvedValue(mockLikesDb)

      const likes = await likeRepository.getUserLikes(userId)

      expect(mockPrismaClient.like.findMany).toHaveBeenCalledWith({
        where: { userId: userId },
      })
      expect(likes).toEqual(expectedLikes)
      expect(likes).toHaveLength(2)
    })

    it('should throw a ResponseError when the database query fails', async () => {
      const userId = 1
      const errorMessage = 'Database connection lost'
      const originalError = new Error(errorMessage)
      mockPrismaClient.like.findMany.mockRejectedValue(originalError)

      await expect(likeRepository.getUserLikes(userId)).rejects.toThrow(
        ResponseError
      )
      await expect(likeRepository.getUserLikes(userId)).rejects.toThrow(
        `Failed to fetch likes for user ${userId}: ${errorMessage}`
      )
      expect(mockPrismaClient.like.findMany).toHaveBeenCalledWith({
        where: { userId: userId },
      })
    })
  })

  describe('addLike', () => {
    it('should create a new like and return the created LikeEntity', async () => {
      const likeToAdd: LikeEntity = { userId: 1, postId: 15 } as LikeEntity // Cast needed if LikeEntity doesn't have id
      const mockCreatedLikeDb = {
        id: 3,
        userId: 1,
        postId: 15,
        created_at: new Date(),
      }
      const expectedLike: LikeEntity = mockCreatedLikeDb as LikeEntity

      mockPrismaClient.like.create.mockResolvedValue(mockCreatedLikeDb)

      const createdLike = await likeRepository.addLike(likeToAdd)

      expect(mockPrismaClient.like.create).toHaveBeenCalledWith({
        data: {
          userId: likeToAdd.userId,
          postId: likeToAdd.postId,
        },
      })
      expect(createdLike).toEqual(expectedLike)
    })

    it('should throw a ResponseError with conflict status for unique constraint violation (P2002)', async () => {
      const likeToAdd: LikeEntity = { userId: 1, postId: 15 } as LikeEntity
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        'Unique constraint failed',
        { code: 'P2002', clientVersion: 'x.y.z' }
      )
      mockPrismaClient.like.create.mockRejectedValue(prismaError)

      await expect(likeRepository.addLike(likeToAdd)).rejects.toThrow(
        ResponseError
      )
      await expect(likeRepository.addLike(likeToAdd)).rejects.toMatchObject({
        message: `User ${likeToAdd.userId} already liked post ${likeToAdd.postId}`,
        statusCode: 409, // Check if status code is set correctly
      })
      expect(mockPrismaClient.like.create).toHaveBeenCalledWith({
        data: { userId: likeToAdd.userId, postId: likeToAdd.postId },
      })
    })

    it('should throw a generic ResponseError when the database query fails', async () => {
      const likeToAdd: LikeEntity = { userId: 1, postId: 15 } as LikeEntity
      const errorMessage = 'Cannot write to database'
      const originalError = new Error(errorMessage)
      mockPrismaClient.like.create.mockRejectedValue(originalError)

      await expect(likeRepository.addLike(likeToAdd)).rejects.toThrow(
        ResponseError
      )
      await expect(likeRepository.addLike(likeToAdd)).rejects.toThrow(
        `Failed to add like for user ${likeToAdd.userId} on post ${likeToAdd.postId}: ${errorMessage}`
      )
      expect(mockPrismaClient.like.create).toHaveBeenCalledWith({
        data: { userId: likeToAdd.userId, postId: likeToAdd.postId },
      })
    })
  })

  describe('removeLike', () => {
    const postId = 10
    const userId = 1
    const mockExistingLikeDb = {
      id: 5,
      userId: userId,
      postId: postId,
      created_at: new Date(),
    }
    const expectedRemovedLike: LikeEntity = mockExistingLikeDb as LikeEntity

    it('should remove a like and return the removed LikeEntity', async () => {
      // Mock findFirst to find the like
      mockPrismaClient.like.findFirst.mockResolvedValue(mockExistingLikeDb)
      // Mock delete to succeed
      mockPrismaClient.like.delete.mockResolvedValue(mockExistingLikeDb) // Often returns the deleted record

      const deletedLike = await likeRepository.removeLike(postId, userId)

      expect(mockPrismaClient.like.findFirst).toHaveBeenCalledWith({
        where: { postId: postId, userId: userId },
      })
      expect(mockPrismaClient.like.delete).toHaveBeenCalledWith({
        where: { id: mockExistingLikeDb.id },
      })
      expect(deletedLike).toEqual(expectedRemovedLike)
    })

    it('should throw LikeRepositoryValidationError if postId is null', async () => {
      await expect(
        likeRepository.removeLike(null as any, userId)
      ).rejects.toThrow(LikeRepositoryValidationError)
      await expect(
        likeRepository.removeLike(null as any, userId)
      ).rejects.toThrow('Post ID must be provided!')
      expect(mockPrismaClient.like.findFirst).not.toHaveBeenCalled()
      expect(mockPrismaClient.like.delete).not.toHaveBeenCalled()
    })

    it('should throw LikeRepositoryValidationError if userId is undefined', async () => {
      await expect(likeRepository.removeLike(postId, 0)).rejects.toThrow(
        LikeRepositoryValidationError
      )
      await expect(likeRepository.removeLike(postId, 0)).rejects.toThrow(
        'User ID must be provided!'
      )
      expect(mockPrismaClient.like.findFirst).not.toHaveBeenCalled()
      expect(mockPrismaClient.like.delete).not.toHaveBeenCalled()
    })

    it('should throw LikeNotFoundError if the like to remove is not found', async () => {
      // Mock findFirst to return null
      mockPrismaClient.like.findFirst.mockResolvedValue(null)

      await expect(likeRepository.removeLike(postId, userId)).rejects.toThrow(
        LikeNotFoundError
      )
      await expect(likeRepository.removeLike(postId, userId)).rejects.toThrow(
        `Like not found for post ${postId} and user ${userId}`
      )
      expect(mockPrismaClient.like.findFirst).toHaveBeenCalledWith({
        where: { postId: postId, userId: userId },
      })
      // Ensure delete was NOT called if findFirst failed
      expect(mockPrismaClient.like.delete).not.toHaveBeenCalled()
    })

    it('should throw ResponseError if findFirst fails', async () => {
      const errorMessage = 'DB error during find'
      const originalError = new Error(errorMessage)
      mockPrismaClient.like.findFirst.mockRejectedValue(originalError)

      await expect(likeRepository.removeLike(postId, userId)).rejects.toThrow(
        ResponseError
      )
      await expect(likeRepository.removeLike(postId, userId)).rejects.toThrow(
        `Failed to remove like for post ${postId}, user ${userId}: ${errorMessage}`
      )
      expect(mockPrismaClient.like.findFirst).toHaveBeenCalledWith({
        where: { postId: postId, userId: userId },
      })
      expect(mockPrismaClient.like.delete).not.toHaveBeenCalled()
    })

    it('should throw ResponseError if delete fails after finding the like', async () => {
      const errorMessage = 'DB error during delete'
      const originalError = new Error(errorMessage)
      // Mock findFirst to succeed
      mockPrismaClient.like.findFirst.mockResolvedValue(mockExistingLikeDb)
      // Mock delete to fail
      mockPrismaClient.like.delete.mockRejectedValue(originalError)

      await expect(likeRepository.removeLike(postId, userId)).rejects.toThrow(
        ResponseError
      )
      await expect(likeRepository.removeLike(postId, userId)).rejects.toThrow(
        `Failed to remove like for post ${postId}, user ${userId}: ${errorMessage}`
      )

      expect(mockPrismaClient.like.findFirst).toHaveBeenCalledWith({
        where: { postId: postId, userId: userId },
      })
      expect(mockPrismaClient.like.delete).toHaveBeenCalledWith({
        where: { id: mockExistingLikeDb.id },
      })
    })

    it('should throw LikeNotFoundError if delete fails with P2025 (Record not found)', async () => {
      // Mock findFirst to succeed initially
      mockPrismaClient.like.findFirst.mockResolvedValue(mockExistingLikeDb)
      // Mock delete to fail with P2025
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        'Record to delete not found',
        { code: 'P2025', clientVersion: 'x.y.z' }
      )
      mockPrismaClient.like.delete.mockRejectedValue(prismaError)

      // Should be caught and re-thrown as our specific LikeNotFoundError
      await expect(likeRepository.removeLike(postId, userId)).rejects.toThrow(
        LikeNotFoundError
      )
      await expect(likeRepository.removeLike(postId, userId)).rejects.toThrow(
        `Like not found for post ${postId} and user ${userId}`
      )

      expect(mockPrismaClient.like.findFirst).toHaveBeenCalledWith({
        where: { postId: postId, userId: userId },
      })
      expect(mockPrismaClient.like.delete).toHaveBeenCalledWith({
        where: { id: mockExistingLikeDb.id },
      })
    })
  })
})
