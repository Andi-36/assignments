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

    const userExist = User.findOne({ username: username })

    if (userExist) {
        res.status(400).send("Ussername already exist")
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

app.post("/sign", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!checkUserExist(username, password)) {
        res.status(403).json({
            msg: "User does not exist"
        })
    }

    const token = jwt.sign({ username: username }, jwtPassword);

    res.json({
        token
    })
})

app.get("/users", (req, res) => {
    const token = req.headers.authorization;

    try {
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username
        const newUserList = ALL_USERS?.filter((user) => user.username !== username)
        res.json({
            users: newUserList,
        })
    } catch (error) {
        return res.status().json({
            msg: " Invalid token"
        })
    }
})

app.listen(3000);
