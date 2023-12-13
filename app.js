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
const blogsData = {
  "blogs": [
      {
          "id": 1,
          "title": "Embracing the Art of Mindfulness",
          "author": "Mindful Maven",
          "content": "In the hustle and bustle of modern life, finding moments of stillness becomes a precious endeavor. Mindfulness, the practice of being present in the current moment without judgment, offers a serene refuge in our fast-paced world. Picture yourself in a quiet space, surrounded by nature's symphony. As you take a deep breath, feel the cool breeze on your skin. Inhale, exhale – a simple rhythm that connects you with the essence of now. Mindfulness isn't about emptying the mind but rather observing thoughts without attachment. It's a journey inward, exploring the depths of your consciousness. Through regular practice, you cultivate a profound awareness that extends to your daily experiences. Embrace mindfulness as a gift to yourself. Let it be the compass guiding you through the ebb and flow of life. In this oasis of tranquility, discover the art of mindfulness and unlock a world of inner peace and clarity."
      },
      {
          "id": 2,
          "title": "The Magic of Morning Rituals",
          "author": "Rise-and-Shine Enthusiast",
          "content": "The way you start your morning sets the tone for the entire day. Embrace the magic of morning rituals to foster positivity and productivity. Begin with a mindful moment – savor your first cup of coffee or tea. Let the warmth and aroma awaken your senses. Engage in gentle stretching to invigorate your body. As you breathe deeply, visualize your goals for the day. Journal your thoughts and set intentions. Establishing a morning routine creates a sense of stability and purpose. Whether it's a brisk walk, reading a chapter, or a moment of gratitude, find rituals that resonate with you. Harness the power of mornings to create a life that aligns with your aspirations."
      },
      {
          "id": 3,
          "title": "Culinary Adventures",
          "author": "Epicurean Explorer",
          "content": "Embark on a culinary journey to nourish your soul and delight your taste buds. Explore diverse flavors, textures, and aromas that elevate the dining experience. Start with simple pleasures – a homemade meal shared with loved ones. Experiment with ingredients, infuse creativity into your dishes, and savor the joy of cooking. Venture beyond your comfort zone and indulge in global cuisines. Discover the stories behind each recipe and the cultural tapestry woven into every bite. From the sizzle of a pan to the harmony of spices, culinary adventures awaken the senses. Embrace the art of cooking as a form of self-expression and a celebration of life's rich tapestry."
      }
  ]
}
const blogs=blogsData.blogs
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
  posts.push(post);
  res.redirect("/");
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

app.get("/blogs/:blogName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.blogName);

  blogs.forEach(function (blog) {
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
  res.render("404");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected"))
  .catch((error) => console.log(error));
app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});