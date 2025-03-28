import { UserEntity } from "../../../user/domain/entity/user.entity"

export interface CommentEntity {
  id?: number
  content: string
  userId: number
  postId: number
  user: UserEntity
  createdAt?: Date
  updatedAt?: Date
} 