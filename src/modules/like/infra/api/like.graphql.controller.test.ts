import { GraphQLError } from 'graphql'
import { LikeUsecases } from '../../application/usecases/like.usecases'
import { LikeEntity } from '../../domain/entity/like.entity'
import { LikeGraphqlController } from './like.graphql.controlles'

jest.mock('../../../../infra/libs/prisma/client')

jest.mock('../../../../infra/libs/prisma/client', () => ({
  __esModule: true,
  default: {
    like: {
      create: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
    },
  },
}))

jest.mock('../../application/usecases/like.usecases')

describe('LikeGraphqlController', () => {
  let controller: LikeGraphqlController
  let mockLikeUsecases: jest.Mocked<LikeUsecases>

  beforeEach(() => {
    mockLikeUsecases = {
      addLike: jest.fn().mockImplementation((like: LikeEntity) => like),
      removeLike: jest
        .fn()
        .mockImplementation((postId: number, userId: number) => ({
          postId,
          userId,
        })),
      getUserLikes: jest.fn().mockImplementation(() => []),
    } as unknown as jest.Mocked<LikeUsecases>

    ;(LikeUsecases as jest.Mock).mockImplementation(() => mockLikeUsecases)
    controller = new LikeGraphqlController()
  })

  //---------------------
  // addLike Tests
  //---------------------
  describe('addLike', () => {
    const postId = 1
    const userId = 10
    const likeInput = { postId, userId }
    const expectedLike: LikeEntity = { id: 1, userId, postId } as LikeEntity
    it('should add a like successfully', async () => {
      // Arrange
      ;(mockLikeUsecases.addLike as jest.Mock).mockResolvedValue(expectedLike)

      // Act
      const result = await controller.addLike(postId, userId)

      // Assert
      expect((mockLikeUsecases.addLike as jest.Mock).mock.calls).toHaveLength(1)
      expect((mockLikeUsecases.addLike as jest.Mock).mock.calls[0]).toEqual([
        likeInput,
      ])
      expect(result).toEqual(expectedLike)
    })

    it('should throw an Error if postId is not provided', async () => {
      // Act & Assert
      await expect(
        controller.addLike(null as unknown as number, userId)
      ).rejects.toThrow('Post ID must be provided!')
      expect((mockLikeUsecases.addLike as jest.Mock).mock.calls).toHaveLength(0)
    })

    it('should throw an Error if userId is not provided', async () => {
      await expect(
        controller.addLike(postId, null as unknown as number)
      ).rejects.toThrow('User ID must be provided!')
    })

    it('should catch errors from use cases and throw GraphQLError', async () => {
      const originalErrorMessage = 'Failed to add like in use case'
      const originalError = new Error(originalErrorMessage)
      ;(mockLikeUsecases.addLike as jest.Mock).mockRejectedValue(originalError)

      try {
        await controller.addLike(postId, userId)
        fail('Should have thrown GraphQLError')
      } catch (error) {
        expect(error).toBeInstanceOf(GraphQLError)
        const gqlError = error as GraphQLError
        expect(gqlError.message).toBe(originalErrorMessage)
        expect(gqlError.extensions?.code).toBe('INTERNAL_SERVER_ERROR')
      }

      expect((mockLikeUsecases.addLike as jest.Mock).mock.calls).toHaveLength(1)
      expect((mockLikeUsecases.addLike as jest.Mock).mock.calls[0]).toEqual([
        likeInput,
      ])
    })
  })
})
