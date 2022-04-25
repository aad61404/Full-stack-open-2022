const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user")
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

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
  const token = getTokenFrom(req)
  console.log('token:', token)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  console.log('decodedToken:', decodedToken)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)


  // const users = await User.find({})
  // const userId = users[0]._id

  // const user = await User.findById(userId)

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
