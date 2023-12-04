const mongoose = require("mongoose");

const { Schema } = mongoose;

const contactSchema = new Schema({
  name: String,
  email: String,
  message: String,
});

module.exports.User = mongoose.model("Contact", contactSchema);