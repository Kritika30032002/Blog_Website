const { User } = require("../models/auth");

// Render sign-up page
module.exports.signUpPage = (req, res) => {
  res.render("signup");
};

// Handle sign-up logic
module.exports.signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if the email is already registered
  const existingUser = await User.findOne({ email });
// console.log(existingUser);

  if (existingUser) {
    return res.render("error", {
      error1: "A user with this email already exists.",
    });
  }

  // Regular expressions for password validation
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const capitalLetterRegex = /[A-Z]/;
// console.log(!capitalLetterRegex.test(password));

  // Check if the password meets the criteria
  if (password.length < 6 || !specialCharRegex.test(password) || !capitalLetterRegex.test(password)) {
    return res.render("error", {
      error1: "Password must be at least 8 characters long, contain at least one special character, and one capital letter",
    });
  }

  const newUser = new User({ name, email });
    console.log(newUser);
    
  try {
    // Register the new user
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);

    // Log in the user after registration
    req.logIn(registeredUser, (err) => {
      if (err) {
        return res.render("error", { error1: "Error logging in after registration." });
      }
      res.redirect("/home");
    });
  } catch (error) {
    // Handle registration error
    console.error(error);
    return res.render("error", {
      error1: "Registration failed. Please try again.",
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
