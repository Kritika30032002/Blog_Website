const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require("bcrypt");


const { Schema } = mongoose;

const authSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

// Pre-save hook to hash the password before saving the user
authSchema.pre('save', async function (next) {
  const auth = this;

  // Only hash the password if it has been modified (or is new)
  if (!auth.isModified('password')) return next();

  try {
    // Generate a salt and hash the password
    const saltRounds = 10;
    auth.password = await bcrypt.hash(auth.password, saltRounds);
    next();
  } catch (err) {
    next(err);
  }
});


authSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports.User = mongoose.model("User", authSchema);