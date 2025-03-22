import { PostEntity } from '../../domain/entity/post.entity'
import { PostRepository } from '../../infra/repository/post.repository'

export class DeletePostUseCase {
  private _repository: PostRepository

  constructor(repository: PostRepository) {
    this._repository = repository
  }

  async execute(id: number): Promise<PostEntity | null> {
    return this._repository.deletePost(id)
  }
}
