import { PostEntity } from '../../domain/entity/post.entity'
import { PostRepository } from '../../infra/repository/post.repository'

export class UpdatePostUseCase {
  private _repository: PostRepository

  constructor(repository: PostRepository) {
    this._repository = repository
  }

  async execute(id: number, input: PostEntity): Promise<PostEntity | null> {
    return this._repository.updatePost(id, input)
  }
}
