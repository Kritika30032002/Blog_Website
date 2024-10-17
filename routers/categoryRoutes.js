const express = require('express');
const router = express.Router();
const Category = require('./models/category');
// Add a category
router.post('/category', async (req, res) => {
    const newCategory = new Category({ name: req.body.name });
    try {
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
