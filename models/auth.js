const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const { Schema } = mongoose;

const authSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

authSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports.User = mongoose.model("User", authSchema);
