import { PostEntity } from '../../domain/entity/post.entity'
import { PostRepository } from '../../infra/repository/post.repository'

export class GetPostsByTitle {
  private _repository: PostRepository

  constructor(repository: PostRepository) {
    this._repository = repository
  }

  async execute(title: string): Promise<PostEntity[]> {
    return await this._repository.getPostsByTitle(title)
  }
}
