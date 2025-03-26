import { randomInt } from 'node:crypto'

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

interface CategoryEntity {
  id: number
  name: string
  posts: PostEntity[]
}



export class PostEntity {
  id?: number
  title: string
  content: string
  userId: number
  categories: CategoryEntity[]
  published: boolean
  created_at?: Date
  updated_at?: Date

  private constructor(data: PostEntity) {
    this.title = data.title
    this.content = data.content
    this.userId = data.userId
    this.categories = data.categories
    this.published = data.published
  }

  static create(
    data: WithOptional<PostEntity, 'id' | 'created_at' | 'updated_at'>
  ): PostEntity {
    return new PostEntity({
      ...data,
      id: data.id ?? randomInt(0, 1000),
      created_at: data.created_at ?? new Date(),
      updated_at: data.updated_at ?? new Date(),
    })
  }

  static createFrom(data: PostEntity): PostEntity {
    return new PostEntity(data)
  }
}
