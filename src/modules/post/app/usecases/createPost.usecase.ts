import { PostEntity } from '../../domain/entity/post.entity'
import { PostRepository } from '../../infra/repository/post.repository'

export class CreatePostUseCase {
  private _repository: PostRepository

  constructor(repository: PostRepository) {
    this._repository = repository
  }

  async execute(input: PostEntity): Promise<PostEntity> {
    try {
      return this._repository.createPost(input)
    } catch (error) {
      return { error } as unknown as PostEntity
    }
  }
}
