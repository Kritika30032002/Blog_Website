const { User } = require("../models/auth");

// Render sign-up page
module.exports.signUpPage = (req, res) => {
  res.render("signup");
};

// Handle sign-up logic
module.exports.signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email });

  // Regular expressions for password validation
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const capitalLetterRegex = /[A-Z]/;

  // Check if the password meets the criteria
  if (!specialCharRegex.test(password) || !capitalLetterRegex.test(password)) {
    return res.render("error", {
      error1: "Password must contain at least one special character and one capital letter",
    });
  }

  try {
    // Register the new user
    const registeredUser = await User.register(newUser, password);

    // Log in the user after registration
    await req.logIn(registeredUser, (err) => {
      if (err) {
        return res.render("error", { error1: err });
      }
      res.redirect("/home");
    });
  } catch (error) {
    // Handle registration error
    res.render("error", {
      error1: error,
    });
  }
};

// Render sign-in page
module.exports.signinPage = (req, res) => {
  res.render("signin");
};

// Handle sign-in logic
module.exports.signIn = (req, res) => {
  res.redirect("/home");
};

// Log out the user
module.exports.logOut = (req, res, next) => {
  req.logOut(() => {
    try {
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  });
};
