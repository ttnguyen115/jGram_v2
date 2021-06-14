const Posts = require('../models/postModel');
const Comments = require('../models/commentModel');

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 9;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

const postController = {
    createPost: async (req, res) => {
        try {
            const { content, images } = req.body;

            if (images.length === 0) return res.status(400).json({ msg: 'Please add your photos!' });

            const newPost = new Posts({
                content, images, user: req.user._id
            });
            await newPost.save();

            res.json({
                msg: 'Create Post!',
                newPost
            });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getPosts: async (req, res) => {
        try {
            const features = new APIfeatures(Posts.find({ 
                user: [...req.user.following, req.user._id] 
            }), req.query).paginating()

            const posts = await features.query.sort('-createdAt')
            .populate('user likes', 'avatar username fullname')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user likes',
                    select: '-password'
                }
            })

            res.json({
                msg: 'Success!',
                result: posts.length,
                posts
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    updatePost: async (req, res) => {
        try {
            const { content, images } = req.body;

            const post = await Posts.findOneAndUpdate({ _id: req.params.id }, {
                content, images
            })
            .populate('user likes', 'avatar username fullname')
            .populate({
                path: "comments",
                populate: {
                    path: "user likes",
                    select: "-password"
                }
            })

            res.json({
                msg: 'Update Post!',
                newPost: {
                    ...post._doc,
                    content, images
                }
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    likePost: async (req, res) => {
        try {
            const post = await Posts.find({ _id: req.params.id, likes: req.user._id });
            if (post.length > 0) return res.status(400).json({ msg: 'You liked this post!' })

            const like = await Posts.findOneAndUpdate({ _id: req.params.id }, {
                $push: { likes: req.user._id }
            }, { new: true });

            if (!like) return res.status(400).json({ msg: 'This post does not exist!' });

            res.json({ msg: 'Liked post!' })

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    unlikePost: async (req, res) => {
        try {
            const unlike = await Posts.findOneAndUpdate({ _id: req.params.id }, {
                $pull: { likes: req.user._id }
            }, { new: true });

            if (!unlike) return res.status(400).json({ msg: 'This post does not exist!' });

            res.json({ msg: 'Unliked post!' })

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getUserPosts: async (req, res) => {
        try {
            const features = new APIfeatures(Posts.find({ user: req.params.id }), req.query).paginating();
            const posts = await features.query.sort('-createdAt');

            res.json({ 
                posts,
                result: posts.length
            });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getPost: async (req, res) => {
        try {
            const post = await Posts.findById(req.params.id)
            .populate('user likes', 'avatar username fullname')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user likes',
                    select: '-password'
                }
            });

            if (!post) return res.status(400).json({ msg: 'This post does not exist!' });

            res.json({ post });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getPostsDiscover: async (req, res) => {
        try {
            const features = new APIfeatures(Posts.find({ 
                user: {$nin: [...req.user.following, req.user._id]} 
            }), req.query).paginating()

            const posts = await features.query.sort('-createdAt')

            res.json({
                msg: 'Success!',
                result: posts.length,
                posts
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    deletePost: async (req, res) => {
        try {
            const post = await Posts.findOneAndDelete({ _id: req.params.id, user: req.user._id });
            await Comments.deleteMany({ _id: { $in: post.comments } });

            res.json({ msg: 'Deleted Post!' });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

module.exports = postController;