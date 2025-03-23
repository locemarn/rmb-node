import { PostRepository } from '../../infra/repository/post.repository'

export class GetPostsUseCase {
  private _repository: PostRepository

  constructor(repository: PostRepository) {
    this._repository = repository
  }

  async execute() {
    return this._repository.getAllPosts()
  }
}
