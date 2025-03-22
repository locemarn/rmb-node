import { Router } from 'express'
import { PostController } from './post.controller'

const postRouter = Router()

const postController = new PostController()

postRouter.route('/').get(async (req, res) => {
  await postController.getPosts(req, res)
})
//   .post(async (req: Request, res: Response) => {
//     await postController.createUser(req, res)
//   })
// postRouter
//   .route('/:id')
//   .patch(async (req: Request, res: Response) => {
//     await postController.updateUser(req, res)
//   })
//   .delete(async (req: Request, res: Response) => {
//     await postController.deleteUser(req, res)
//   })
//   .get(async (req: Request, res: Response) => {
//     await postController.getUserById(req, res)
//   })

export default postRouter
