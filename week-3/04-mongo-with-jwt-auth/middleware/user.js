const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { jwtPassword } = require("../db/jwtConfig");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    const bearerAuthToken = req.headers.authorization
    const token = bearerAuthToken.split(" ")[1];
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username

    const user = await User.findOne({ username: username })

    if (user) {
        next()
    } else {
        res.status(403).json({ msg: "Not an admin user" });
    }


}

module.exports = userMiddleware;