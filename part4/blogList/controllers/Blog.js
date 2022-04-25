const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user")

// blogsRouter.find({}).then((result) => {
//   console.log("find blog");
//   console.log("result:", result);
// });

blogsRouter.get('/', async (req, res) => {
  const Blogs = await Blog
    .find({})
    .populate('user', {
      username: 1,
      name: 1,
      id: 1,
    })
    // console.log('Blogs:', Blogs)
  res.json(Blogs)
})

blogsRouter.post("/", async (req, res) => {
  //get to test first user id
  const users = await User.find({})
  const userId = users[0]._id

  const user = await User.findById(userId)

  const blog = new Blog({
    ...req.body,
    user: user._id,
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
});


module.exports = blogsRouter;
