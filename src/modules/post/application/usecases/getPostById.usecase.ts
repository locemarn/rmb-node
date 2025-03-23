import { PostEntity } from '../../domain/entity/post.entity'
import { PostRepository } from '../../infra/repository/post.repository'

export class GetPostByIdUseCase {
  private _repository: PostRepository

  constructor(repository: PostRepository) {
    this._repository = repository
  }

  async execute(id: number): Promise<PostEntity> {
    return await this._repository.getPostById(id)
  }
}
