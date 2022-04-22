const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

// blogsRouter.find({}).then((result) => {
//   console.log("find blog");
//   console.log("result:", result);
// });

blogsRouter.get("/", (req, res) => {
  Blog.find({}).then((blogs) => {
    console.log('blogs:', blogs)
    res.json(blogs);
  });
});

blogsRouter.post("/", (req, res) => {
  const newBlog = new Blog({
    title: "Arto Vihavainen",
    author: "aaaaa",
    url: "String",
    likes: 123,
  });

  newBlog.save().then((result) => {
    res.status(400).json({ msg: "note saved!"});
  });

  // const blog = new Blog(req.body);
  // blog.save().then((result) => {
  //   response.status(201).json(result);
  // });
});


module.exports = blogsRouter;
