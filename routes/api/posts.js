const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validatePostInput = require('../../validation/post');

// Load Post Model
const Post = require('../../models/Post');
// Load Profile Model
const Profile = require('../../models/Profile');

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

// @route   GET api/posts
// @desc    Get post route
// @access  Public
router.get('/', (req, res) => {
	Post.find()
		.sort({ date: -1 })
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json({ noPostsFound: 'No posts found' }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then(post => res.json(post))
		.catch(err => res.status(404).json({ nopostFound: 'Not Found Post' }));
});

// @route   POST api/posts
// @desc    Create post
// @access  Public
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const newPost = new Post({
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar,
		user: req.user.id,
	});

	newPost
		.save()
		.then(post => {
			res.json(post);
		})
		.catch(err => res.status(400).json(err));
});

// @route   DELETE api/posts/:id
// @desc    DELETE post route
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then(profile => {
		Post.findById(req.params.id)
			.then(post => {
				if (post.user.toString() !== req.user.id) {
					return res.status(401).json({ notauthorize: 'User not authorized' });
				}

				// Delete
				post
					.remove()
					.then(() => {
						res.json({ success: true });
					})
					.catch(err => res.status(404).json({ notfoundpost: 'Post not found' }));
			})
			.catch(err => res.status(400).json(err));
	});
});

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then(profile => {
		Post.findById(req.params.id)
			.then(post => {
				if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
					return res.status(400).json({ alreadyliked: 'User already liked this post' });
				}

				// Add user id to likes array
				post.likes.unshift({ user: req.user.id });

				post.save().then(post => res.json(post));
			})
			.catch(err => res.status(400).json(err));
	});
});

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then(profile => {
		Post.findById(req.params.id)
			.then(post => {
				if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
					return res.status(400).json({ notliked: 'You have not yet liked this posts' });
				}

				// Get remove index
				const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);

				// Splice out of array
				post.likes.splice(removeIndex, 1);

				// Save
				post.save().then(post => res.json(post));
			})
			.catch(err => res.status(400).json(err));
	});
});

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	Post.findById(req.params.id)
		.then(post => {
			const newComment = {
				text: req.body.text,
				name: req.body.name,
				avatar: req.body.avatar,
				user: req.user.id,
			};

			// Add to comments array
			post.comments.unshift(newComment);

			// Save
			post.save().then(post => res.json(post));
		})
		.catch(error => res.status(404).json({ postnotfound: 'No post found' }));
});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    DELETE comment from post
// @access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Post.findById(req.params.id)
		.then(post => {
			if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
				return res.status(404).json({ commentnotexist: 'Comment does not exist' });
			}

			const removeIndex = post.comments.map(comment => comment._id.toString()).indexOf(req.params.comment_id);

			post.comments.splice(removeIndex, 1);
			post.save().then(post => res.json(post));
			return res.json(post);
		})
		.catch(error => res.status(404).json({ postnotfound: 'No post found!!!' }));
});

module.exports = router;
