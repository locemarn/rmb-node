import { LikeInputValidationError } from '../../../../utils/fixtures/errors/LikeInputValidationError'
import { LikeEntity } from '../../domain/entity/like.entity'
import { LikeRepositoryInterface } from '../../domain/repository/likeRepository.interface'
import { LikeRepository } from './like.repository'

type MockLikeRepository = jest.Mocked<LikeRepositoryInterface>

const createMockRepository = (): MockLikeRepository => ({
  addLike: jest.fn(),
  removeLike: jest.fn(),
  getUserLikes: jest.fn(),
})

describe('LikeRepository (Wrapper)', () => {
  let mockRepository: MockLikeRepository
  let likeRepositoryWrapper: LikeRepository

  beforeEach(() => {
    mockRepository = createMockRepository()
    likeRepositoryWrapper = new LikeRepository(mockRepository)
    jest.clearAllMocks()
  })

  //---------------------
  // addLike Tests
  //---------------------
  describe('addLike', () => {
    const validLike: LikeEntity = { userId: 1, postId: 100 } as LikeEntity
    const expectedCreatedLike: LikeEntity = {
      id: 1,
      ...validLike,
    } as LikeEntity

    it('should call the underlying repository addLike and return its result on success', async () => {
      mockRepository.addLike.mockResolvedValue(expectedCreatedLike)
      const result = await likeRepositoryWrapper.addLike(validLike)

      // console.log(mockRepository.addLike.mock);
      expect(mockRepository.addLike.mock.calls.length).toBe(1)
      expect(mockRepository.addLike.mock.calls[0][0]).toEqual(validLike)
      expect(result).toEqual(expectedCreatedLike)
    })

    it('should call the underlying repository addLike and return its result on success', async () => {
      // Arrange: Configure the mock to resolve successfully
      mockRepository.addLike.mockResolvedValue(expectedCreatedLike)

      // Act: Call the method on the wrapper
      const result = await likeRepositoryWrapper.addLike(validLike)

      // Assert: Check if the underlying repo was called correctly
      expect(mockRepository.addLike.mock.calls.length).toBe(1)
      expect(mockRepository.addLike.mock.calls[0][0]).toEqual(validLike)
      // Assert: Check if the result from the underlying repo is returned
      expect(result).toEqual(expectedCreatedLike)
    })

    it('should throw LikeInputValidationError if userId is missing', async () => {
      const invalidLike = { postId: 100 } as LikeEntity

      await expect(likeRepositoryWrapper.addLike(invalidLike)).rejects.toThrow(
        LikeInputValidationError
      )
      await expect(likeRepositoryWrapper.addLike(invalidLike)).rejects.toThrow(
        'User ID and Post ID are required to add a like.'
      )
      expect(mockRepository.addLike.mock.calls.length).toBe(0)
    })

    it('should throw LikeInputValidationError if postId is missing', async () => {
      const invalidLike = { userId: 1 } as LikeEntity

      await expect(likeRepositoryWrapper.addLike(invalidLike)).rejects.toThrow(
        LikeInputValidationError
      )
      await expect(likeRepositoryWrapper.addLike(invalidLike)).rejects.toThrow(
        'User ID and Post ID are required to add a like.'
      )
      expect(mockRepository.addLike.mock.calls.length).toBe(0)
    })

    it('should throw LikeInputValidationError if like object itself is null or undefined', async () => {
      await expect(
        likeRepositoryWrapper.addLike(null as unknown as LikeEntity)
      ).rejects.toThrow(LikeInputValidationError)
      await expect(
        likeRepositoryWrapper.addLike(undefined as unknown as LikeEntity)
      ).rejects.toThrow(LikeInputValidationError)
      expect(mockRepository.addLike.mock.calls.length).toBe(0)
    })

    it('should propagate errors thrown by the underlying repository', async () => {
      const originalError = new Error('Database connection failed')
      mockRepository.addLike.mockRejectedValue(originalError)

      await expect(likeRepositoryWrapper.addLike(validLike)).rejects.toThrow(
        originalError
      )
      expect(mockRepository.addLike.mock.calls[0][0]).toEqual(validLike)
    })
  })

  //---------------------
  // removeLike Tests
  //---------------------
  describe('removeLike', () => {
    const validLike: LikeEntity = { userId: 1, postId: 100 } as LikeEntity
    const expectedRemovedLike: LikeEntity = {
      id: 1,
      ...validLike,
    } as LikeEntity
    it('should call the underlying repository removeLike and return its result on success', async () => {
      mockRepository.removeLike.mockResolvedValue(expectedRemovedLike)
      const result = await likeRepositoryWrapper.removeLike(
        validLike.postId,
        validLike.userId
      )

      expect(mockRepository.removeLike.mock.calls.length).toBe(1)
      expect(mockRepository.removeLike.mock.calls[0][0]).toEqual(
        validLike.postId
      )
      expect(mockRepository.removeLike.mock.calls[0][1]).toEqual(
        validLike.userId
      )
      expect(result).toEqual(expectedRemovedLike)
    })

    it('should throw LikeInputValidationError if postId is missing', async () => {
      await expect(
        likeRepositoryWrapper.removeLike(
          null as unknown as number,
          validLike.userId
        )
      ).rejects.toThrow(LikeInputValidationError)
      await expect(
        likeRepositoryWrapper.removeLike(
          null as unknown as number,
          validLike.userId
        )
      ).rejects.toThrow('Post ID and User ID are required to remove a like.')
      expect(mockRepository.removeLike.mock.calls.length).toBe(0)
    })

    it('should throw LikeInputValidationError if userId is missing', async () => {
      await expect(
        likeRepositoryWrapper.removeLike(
          validLike.postId,
          null as unknown as number
        )
      ).rejects.toThrow(LikeInputValidationError)
    })

    it('should propagate errors thrown by the underlying repository', async () => {
      const originalError = new Error('Database connection failed')
      mockRepository.removeLike.mockRejectedValue(originalError)

      await expect(
        likeRepositoryWrapper.removeLike(validLike.postId, validLike.userId)
      ).rejects.toThrow(originalError)
      expect(mockRepository.removeLike.mock.calls[0][0]).toEqual(
        validLike.postId
      )
    })
  })

  //---------------------
  // getUserLikes Tests
  //---------------------
  describe('getUserLikes', () => {
    const validLike: LikeEntity = { userId: 1, postId: 100 } as LikeEntity
    it('should call the underlying repository getUserLikes and return its result on success', async () => {
      mockRepository.getUserLikes.mockResolvedValue([validLike])
      const result = await likeRepositoryWrapper.getUserLikes(validLike.userId)
      expect(mockRepository.getUserLikes.mock.calls.length).toBe(1)
      expect(mockRepository.getUserLikes.mock.calls[0][0]).toEqual(
        validLike.userId
      )
      expect(result).toEqual([validLike])
    })

    it('should throw LikeInputValidationError if userId is missing', async () => {
      await expect(
        likeRepositoryWrapper.getUserLikes(null as unknown as number)
      ).rejects.toThrow(LikeInputValidationError)
    })

    it('should propagate errors thrown by the underlying repository', async () => {
      const originalError = new Error('Database connection failed')
      mockRepository.getUserLikes.mockRejectedValue(originalError)

      await expect(
        likeRepositoryWrapper.getUserLikes(validLike.userId)
      ).rejects.toThrow(originalError)
      expect(mockRepository.getUserLikes.mock.calls[0][0]).toEqual(
        validLike.userId
      )
    })

    it('should return an empty array if no likes are found', async () => {
      mockRepository.getUserLikes.mockResolvedValue([])
      const result = await likeRepositoryWrapper.getUserLikes(validLike.userId)
      expect(result).toEqual([])
    })
  })
})
