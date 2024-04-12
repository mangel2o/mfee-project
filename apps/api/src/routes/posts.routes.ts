import { Router } from 'express';
import * as postsController from '../controllers/posts.controller';

const router = Router();

router.get('/', postsController.getPosts);
router.get('/category/:category', postsController.getPostsByCategory);
router.get('/:id', postsController.getPostById);
router.post('/', postsController.createPost);
router.post('/:id/comments', postsController.createCommentOnPost);
router.patch('/:id', postsController.updatePostById);
router.delete('/:id', postsController.deletePostById);

export default router;
