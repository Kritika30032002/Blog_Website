const { User } = require("../models/auth");

module.exports.signUpPage = (req, res) => {
  res.render("signup");
};

module.exports.signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email });
  try {
    const registeredUser = await User.register(newUser, password);
    await req.logIn(registeredUser, (err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  } catch (error) {
    next(error);
  }
};

module.exports.signinPage = (req, res) => {
  res.render("signin");
};

module.exports.signIn = (req, res) => {
  res.redirect("/");
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
