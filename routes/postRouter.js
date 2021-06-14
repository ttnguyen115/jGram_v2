const router = require('express').Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth')

router.route('/posts')
    .post(auth, postController.createPost)
    .get(auth, postController.getPosts)

router.route('/post/:id')
    .patch(auth, postController.updatePost)
    .get(auth, postController.getPost)
    .delete(auth, postController.deletePost)

router.route('/post/:id/like').patch(auth, postController.likePost)

router.route('/post/:id/unlike').patch(auth, postController.unlikePost)

router.route('/user_posts/:id').get(auth, postController.getUserPosts)

router.route('/post_discover').get(auth, postController.getPostsDiscover)

router.route('/savePost/:id').patch(auth, postController.savePost)

router.route('/unsavePost/:id').patch(auth, postController.unsavePost)

router.route('/getSavePosts').get(auth, postController.getSavePost)

module.exports = router;