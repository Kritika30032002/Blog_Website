const mongoose = require("mongoose");

const { Schema } = mongoose;

const contactSchema = new Schema({
  name: String,
  email: String,
  message: String,
});

module.exports.Contact = mongoose.model("Contact", contactSchema);