const Post = require('../models/Post');
const Notification = require('../models/Notification');
const { minioClient, BUCKET_NAME } = require('../config/minio');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const crypto = require('crypto');
const express = require('express');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// Create Post Route
router.post('/post', authMiddleware, upload.single('codeSnippet'), async (req, res) => {
    const { title, content } = req.body;

    // Validation: Ensure title is provided
    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }

    let codeSnippetUrl = null;

    if (req.file) {
        try {
            const objectName = `${crypto.randomBytes(16).toString('hex')}-${req.file.originalname}`;
            await minioClient.putObject(BUCKET_NAME, objectName, req.file.buffer);
            codeSnippetUrl = `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${BUCKET_NAME}/${objectName}`;
        } catch (error) {
            return res.status(500).json({ error: "Failed to upload code snippet" });
        }
    }

    try {
        // Create and save post
        const post = new Post({ email: req.user.email, title, content, codeSnippetUrl });
        await post.save();

        // Create and save notification
        const notification = new Notification({
            email: req.user.email,
            postId: post._id,
            message: `New post: ${title}`,
        });
        await notification.save();

        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        res.status(500).json({ error: "Error creating post" });
    }
});

// Get Posts of Others
router.get('/post', authMiddleware, async (req, res) => {
    try {
        const posts = await Post.find({ email: { $ne: req.user.email } });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving posts" });
    }
});

// Get Own Posts
router.get('/mypost', authMiddleware, async (req, res) => {
    try {
        const posts = await Post.find({ email: { $eq: req.user.email } });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving your posts" });
    }
});

// Get Single Post by ID
router.get('/post/:id', authMiddleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
