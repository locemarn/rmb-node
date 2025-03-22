import { PostEntity } from '../entity/post.entity'

export interface PostRepositoryInterface {
  getPosts(): Promise<PostEntity[]>
  create(user: PostEntity): Promise<PostEntity>
  update(id: number, user: PostEntity): Promise<PostEntity | null>
  delete(id: number): Promise<PostEntity | null>
  getPostById(id: number): Promise<PostEntity>
  getPostByTitle(title: string): Promise<PostEntity[]>
}
