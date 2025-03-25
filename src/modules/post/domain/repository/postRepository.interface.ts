import { PostEntity } from '../entity/post.entity'

export interface PostRepositoryInterface {
  getPosts(): Promise<PostEntity[]>
  create(post: PostEntity): Promise<PostEntity>
  update(id: number, post: PostEntity): Promise<PostEntity | null>
  delete(id: number): Promise<PostEntity>
  getPostById(id: number): Promise<PostEntity>
  getPostByTitle(title: string): Promise<PostEntity[]>
}
