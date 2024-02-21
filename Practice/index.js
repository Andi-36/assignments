import express from "express";
import zod from "zod"
import jwt from "jsonwebtoken"
const app = express();

import mongoose from "mongoose";

mongoose.connect("mongodb+srv://computerit1995:jKGQG92Owl8Flklp@cluster0.gzqwidu.mongodb.net/user_app");

const User = mongoose.model('Users', { name: String, username: String, password: String })


app.use(express.json());

const jwtPassword = "1234Pwd";

const ALL_USERS = [
  {
    username: "test.st@gmail.com",
    password: "123",
    name: "Anand"
  },
  {
    username: "test.copy@gmail.com",
    password: "12333",
    name: "Anand"
  },
  {
    username: "test.paste@gmail.com",
    password: "12367",
    name: "Aniket"
  }
]

const checkUserExist = (username, password) => {
  let checkUser = false;

  ALL_USERS.forEach(element => {
    if (element?.username === username && password === password) {
      checkUser = true
    }
  });
  return checkUser;
}

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  const userExist = await User.findOne({ username: username })

  if (userExist) {
    return res.status(400).send("Username already exist")
  }

  const user = new User({
    "username": username,
    "password": password,
    "name": name
  })

  user.save()
  res.json({
    msg: "User created successfully"
  })
})

app.post("/sign", async (req, res) => {
  const username = req.body.username;

  const userExist = await User.findOne({ username: username })
  console.log("userExist", userExist)

  if (!userExist) {
    return res.status(403).json({
      msg: "User does not exist"
    })
  }

  const token = jwt.sign({ username: username }, jwtPassword);

  res.json({
    token
  })
})

app.get("/users", async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username
    console.log("username", username)
    const users = await User.find({ username: { $ne: username } });
    console.log("users", users)

    // Send the users in the API response
    res.json({ users });


  } catch (error) {
    console.log("error", error)
    return res.status(403).json({
      msg: error
    })
  }
})

app.listen(3000);
