import { LikeUsecases } from './like.usecases'
import { LikeEntity } from '../../domain/entity/like.entity'
import { LikeRepositoryInterface } from '../../domain/repository/likeRepository.interface'

describe('LikeUsecases', () => {
  let likeUsecases: LikeUsecases
  let mockRepository: LikeRepositoryInterface

  beforeEach(() => {
    mockRepository = {
      addLike: jest.fn().mockImplementation((like: LikeEntity) => like),
      removeLike: jest
        .fn()
        .mockImplementation((postId: number, userId: number) => ({
          postId,
          userId,
          createdAt: new Date(),
        })),
      getUserLikes: jest.fn().mockImplementation(() => []),
    } as unknown as LikeRepositoryInterface

    likeUsecases = new LikeUsecases(mockRepository)
  })

  describe('addLike', () => {
    it('should add a like successfully', async () => {
      const mockLike: LikeEntity = {
        postId: 1,
        userId: 1,
        createdAt: new Date(),
      }

      ;(mockRepository.addLike as jest.Mock).mockResolvedValue(mockLike)

      const result = await likeUsecases.addLike(mockLike)

      expect(result).toEqual(mockLike)
      expect((mockRepository.addLike as jest.Mock).mock.calls).toEqual([
        [mockLike],
      ])
    })
  })

  describe('removeLike', () => {
    it('should remove a like successfully', async () => {
      const mockLike: LikeEntity = {
        postId: 1,
        userId: 1,
        createdAt: new Date(),
      }

      ;(mockRepository.removeLike as jest.Mock).mockResolvedValue(mockLike)

      const result = await likeUsecases.removeLike(1, 1)

      expect(result).toEqual(mockLike)
      expect((mockRepository.removeLike as jest.Mock).mock.calls).toEqual([
        [1, 1],
      ])
    })
  })

  describe('getUserLikes', () => {
    it('should get all likes for a user', async () => {
      const mockLikes: LikeEntity[] = [
        {
          postId: 1,
          userId: 1,
          createdAt: new Date(),
        },
        {
          postId: 2,
          userId: 1,
          createdAt: new Date(),
        },
      ]

      ;(mockRepository.getUserLikes as jest.Mock).mockResolvedValue(mockLikes)

      const result = await likeUsecases.getUserLikes(1)

      expect(result).toEqual(mockLikes)
      expect((mockRepository.getUserLikes as jest.Mock).mock.calls).toEqual([
        [1],
      ])
    })
  })
})
