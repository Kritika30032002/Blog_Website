const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, // This will link to the Category model
        ref: 'Category', // Refers to the Category model
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
