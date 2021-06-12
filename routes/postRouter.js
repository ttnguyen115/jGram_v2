const router = require('express').Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth')

router.route('/posts')
    .post(auth, postController.createPost)
    .get(auth, postController.getPosts)

router.route('/post/:id').patch(auth, postController.updatePost)

router.route('/post/:id/like').patch(auth, postController.likePost)
router.route('/post/:id/unlike').patch(auth, postController.unlikePost)

module.exports = router;