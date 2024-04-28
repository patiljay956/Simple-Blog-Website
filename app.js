const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");

require("dotenv").config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Create a schema for your blog post
const postSchema = new mongoose.Schema(
  {
    title: String,
    postBody: String,
    writer: String,
  },
  { timestamps: true }
);
// Create a Mongoose model based on the schema
const Post = mongoose.model("Post", postSchema);

const aboutPageContent =
  "Welcome to our blog! We are a team of passionate writers who love to share our thoughts and experiences with you. Whether it's technology, travel, or lifestyle, we cover it all. Stay tuned for exciting and informative posts that will keep you engaged and entertained.";

// Function to strip HTML tags from text
function stripHTML(text) {
  return text.replace(/<[^>]*>?/gm, "");
}

app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Home route
app.get("/", async function (req, res) {
  try {
    // Fetch posts from MongoDB
    const posts = await Post.find({}).sort({ createdAt: -1 });
    const postArray = Array.isArray(posts) ? posts : [];

    // No need to fetch dates separately, you can include the date directly in the post object
    res.render("home", {
      postArray: postArray,
      stripHTML: stripHTML,
    });
  } catch (err) {
    console.error(err);
    throw new Error("An error occurred while fetching posts.");
  }
});

// Handle post creation and saving to MongoDB
app.post("/compose", async (req, res) => {
  const post = new Post({
    title: req.body.postTitle.toLowerCase().trim(),
    postBody: req.body.postBody,
    writer: req.body.postBy,
  });

  try {
    // Save the post to MongoDB
    await post.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
    throw new Error("An error occurred while saving the post.");
  }
});

// Contact route
app.get("/contact", function (req, res) {
  res.render("contact");
});

// Compose route
app.get("/compose", function (req, res) {
  res.render("compose");
});

// About route
app.get("/about", function (req, res) {
  res.render("about", {
    AboutContent: aboutPageContent,
  });
});

// Post route
app.get("/posts/:postName", async (req, res) => {
  try {
    // Find the post in MongoDB
    const foundPost = await Post.findOne({ title: req.params.postName });
    if (foundPost) {
      res.render("post", {
        HeadTitle: foundPost.title,
        Content: foundPost.postBody,
      });
    } else {
      res.status(404).send("Post not found.");
    }
  } catch (err) {
    res.status(500).send("An error occurred while fetching the post.");
    console.error(err);
    // Handle the error gracefully without crashing the app
    throw new Error("An error occurred while fetching the post.");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server is up on the port: " + port);
});
