import controller from "../Controllers/postController.js"
import express from "express"
const postRouter = express.Router();

postRouter.get('/posthome', controller.postHome)

postRouter.post('/', controller.createPost)

postRouter.get('/', controller.getAllPosts)

postRouter.get('/:id', controller.getOnePost)

postRouter.patch('/', controller.updatePost)

postRouter.delete('/:id', controller.deletePost)

export default postRouter;