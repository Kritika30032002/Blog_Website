const mongoose = require('mongoose'); // Importing Mongoose

// Defining the structure of a Category in the database
const categorySchema = new mongoose.Schema({
    name: {
        type: String,   // The name of the category, like "Technology"
        required: true, // It must be provided
        unique: true    // No duplicate category names
    }
});

const Category = mongoose.model('Category', categorySchema); // Creating the Category model
module.exports = Category; // Making the model available to use elsewhere
