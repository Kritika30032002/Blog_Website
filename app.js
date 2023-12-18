const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
require("dotenv").config();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const authRouter = require("./routers/auth");
const contactRouter = require("./routers/contact");
const { User } = require("./models/auth");
const blogsData=require('./blog.json')
const blogs1=blogsData.blogs
const fs = require('fs');
const homeStartingContent =
  "Step into the world of words with our user-friendly blog platform! Whether you're a seasoned writer or just getting started, our intuitive interface makes composing and editing blogs a breeze! Join our community of storytellers, where your unique voice is celebrated. Ready to share your thoughts? Click the 'Compose' button below and let your creativity flow! Your blogging journey begins here.";
const aboutContent =
  "Welcome to Daily Journal, your go-to destination for daily journaling and blogging. We understand the power of words and the importance of sharing your thoughts with the world. Our platform is designed to empower individuals like you to express themselves, reflect on their daily lives, and connect with a community of like-minded writers.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const PORT = process.env.PORT || 3000;
const sessionConfig = {
  name: "session",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));
app.use(session(sessionConfig));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let posts = [];

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.get("/", function (req, res) {
  res.render("home", {
    blog1: homeStartingContent,
    posts: [],
  });
});

app.get("/home", function (req, res) {
  res.render("home2", {
    blog1: homeStartingContent,
    posts: posts,
  });
});

app.get("/about", function (req, res) {
  res.render("about", {
    blog2: aboutContent,
  });
});

app.get("/contact", function (req, res) {
  res.render("contact", {
    blog3: contactContent,
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.newTitle,
    blog: req.body.newBlog,
  };
  const post1 = {
    title: req.body.newTitle,
    content: req.body.newBlog,
  };
  posts.push(post);
  blogsData.blogs.push(post1)
  const jsonString = JSON.stringify(blogsData, null, 2);
  fs.writeFileSync('./blog.json', jsonString, 'utf-8');
  res.redirect("/home");
});

app.get("/posts/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        nextBlogTitle: post.title,
        nextBlog: post.blog,
      });
    }
  });
});

app.get("/blogs", function (req, res) {
  res.render("blogs",{blogs: blogsData.blogs});
});

app.get("/error", function (req, res) {
  res.render("error",{error1: "Unauthorised Access"});
});

app.get("/blogs/:blogName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.blogName);

  blogsData.blogs.forEach(function (blog) {
    const storedTitle = _.lowerCase(blog.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        nextBlogTitle: blog.title,
        nextBlog: blog.content,
      });
    }
  });
});

app.use("/", authRouter);
app.use("/", contactRouter);

app.get("*", (req, res) => {
  res.status(404).render("404");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected"))
  .catch((error) => console.log(error));
app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});