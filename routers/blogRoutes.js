const express = require('express');
const router = express.Router();
const Blog = require('../models/blog'); // Ensure you have a Blog model
const Category = require('../models/category'); // Ensure you have a Category model

// Route to get all blogs and filter by category
router.get('/blogs', async (req, res) => {
    try {
        const categories = await Category.find(); // Fetch all categories
        let blogs;
        if (req.query.category) {
            blogs = await Blog.find({ category: req.query.category }).populate('category'); // Filter by category if selected
        } else {
            blogs = await Blog.find().populate('category'); // Otherwise, fetch all blogs
        }
        res.render('blogList', { blogs, categories }); // Pass blogs and categories to the view
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Route to get the form for creating a new blog (with category selection)
router.get('/blogs/new', async (req, res) => {
    try {
        const categories = await Category.find(); // Fetch categories for the form
        res.render('newBlog', { categories });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Route to handle creating a new blog
router.post('/blogs', async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const newBlog = new Blog({ title, content, category }); // Create a new blog with the selected category
        await newBlog.save(); // Save the new blog
        res.redirect('/blogs'); // Redirect to the blog list
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
