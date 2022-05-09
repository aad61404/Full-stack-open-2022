const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  console.log("user:", user);
  // const saltRounds = 10

  const comparePassword = async (password, hash) => {
    try {
      // Compare password
      return await bcrypt.compare(password, hash);
    } catch (error) {
      console.log(error);
    }

    // Return false if error
    return false;
  };

  const passwordCorrect =
    user === null ? false : await comparePassword(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };
  console.log(
    "comparePassword:",
    await comparePassword(password, user.passwordHash)
  );
  const token = jwt.sign(userForToken, process.env.SECRET);
  console.log("token:", token);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
