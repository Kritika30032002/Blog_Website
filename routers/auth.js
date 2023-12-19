const express = require("express");
const {
  signUp,
  signUpPage,
  signinPage,
  signIn,
  logOut,
} = require("../controllers/auth");
const passport = require("passport");

const router = express.Router();

router.route("/signup").get(signUpPage).post(signUp);
router
  .route("/signin")
  .get(signinPage)
  .post(passport.authenticate("local",{failureRedirect:'/error'}), signIn);

router.post("/logout", logOut);

module.exports = router;
