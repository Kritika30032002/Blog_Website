const { User } = require("../models/auth");

module.exports.signUpPage = (req, res) => {
  res.render("signup");
};

module.exports.signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email });
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const capitalLetterRegex = /[A-Z]/;

  if (!specialCharRegex.test(password) || !capitalLetterRegex.test(password)) {
    return res.render("error", {
      error1: "Password must contain at least one special character and one capital letter",
    });
  }
  try {
    const registeredUser = await User.register(newUser, password);
    await req.logIn(registeredUser, (err) => {
      if (err) {res.render("error",{error1:err})};
      res.redirect("/home");
    });
  } catch (error) {
    res.render("error",{
      error1:error
    })
  }
};

module.exports.signinPage = (req, res) => {
  res.render("signin");
};

module.exports.signIn = (req, res) => {
  res.redirect("/home");
};

module.exports.logOut = (req, res, next) => {
  req.logOut(() => {
    try {
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  });
};
