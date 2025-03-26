// import { Request, Response } from 'express'
// import { PostRepositoryInterface } from '../../domain/repository/postRepository.interface'
// import { PostRepository } from '../repository/post.repository'
// import { GetPostsUseCase } from '../../application/usecases/getPosts.usecase'
// import { PostPrismaRepository } from '../database/prisma/postPrisma.repository'
// import { CreatePostUseCase } from '../../application/usecases/createPost.usecase'
// import { DeletePostUseCase } from '../../application/usecases/deletePost.usecase'
// import { UpdatePostUseCase } from '../../application/usecases/updatePost.usecase'

export class PostController {
//   private _prismaRepo: PostRepositoryInterface
//   private _postRepository: PostRepository
//   private _getPostsUseCase: GetPostsUseCase
//   private _createPostUseCase: CreatePostUseCase
//   private _updatePostUseCase: UpdatePostUseCase
//   private _deletePostUseCase: DeletePostUseCase
  

//   constructor() {
//     this._prismaRepo = new PostPrismaRepository()
//     this._postRepository = new PostRepository(this._prismaRepo)
//     this._getPostsUseCase = new GetPostsUseCase(this._postRepository)
//     this._createPostUseCase = new CreatePostUseCase(this._postRepository)
//     this._updatePostUseCase = new UpdatePostUseCase(this._postRepository)
//     this._deletePostUseCase = new DeletePostUseCase(this._postRepository)
//   }
//   async getPosts(req: Request, res: Response): Promise<Response> {
//     console.log('akiiii ----->')

//     try {
//       const response = await this._getPostsUseCase.execute()
//       return res.status(200).json({ response })
//     } catch (error) {
//       const err = error as Error

//       return res.status(500).json({
//         error: true,
//         message: err.message,
//         errorMessage: err.name,
//         stack: err.stack,
//       })
//     }
//   }

//   async createUser(req: Request, res: Response): Promise<Response> {
//     try {
//       const { password } = req.body as UserEntity
//       const userId = encryptHash(password)
//       const user: UserEntity = {
//         ...req.body,
//         password: userId,
//       } as UserEntity
//       const response = await this._createUserUseCase.execute(user)
//       return res.status(201).json({ response })
//     } catch (error) {
//       const err = error as Error

//       return res.status(500).json({
//         error: true,
//         message: err.message,
//         errorMessage: err.name,
//         stack: err.stack,
//       })
//     }
//   }

//   async updateUser(req: Request, res: Response): Promise<Response> {
//     try {
//       const id = parseInt(req.params.id)
//       const { username, email, password, role } = req.body as UserEntity
//       const user = {
//         username,
//         email,
//         password: encryptHash(password),
//         role,
//       } as UserEntity
//       const response = await this._updateUserUseCase.execute(id, user)
//       return res.status(200).json({ response })
//     } catch (error) {
//       const err = error as Error

//       return res.status(500).json({
//         error: true,
//         message: err.message,
//         errorMessage: err.name,
//         stack: err.stack,
//       })
//     }
//   }

//   async deleteUser(req: Request, res: Response): Promise<Response> {
//     try {
//       const id = parseInt(req.params.id)
//       const response = await this._userRepository.deleteUser(id)
//       return res.status(200).json({ response })
//     } catch (error) {
//       const err = error as Error

//       return res.status(500).json({
//         error: true,
//         message: err.message,
//         errorMessage: err.name,
//         stack: err.stack,
//       })
//     }
//   }

//   async getUserById(req: Request, res: Response): Promise<Response> {
//     try {
//       const id = parseInt(req.params.id)
//       const response = await this._userRepository.getUserById(id)
//       return res.status(200).json({ response })
//     } catch (error) {
//       const err = error as Error

//       return res.status(500).json({
//         error: true,
//         message: err.message,
//         errorMessage: err.name,
//         stack: err.stack,
//       })
//     }
//   }
}
