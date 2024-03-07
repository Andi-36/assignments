const { Admin } = require("../db");
const jwt = require("jsonwebtoken");
const { jwtPassword } = require("../db/jwtConfig");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    const bearerAuthToken = req.headers.authorization
    const token = bearerAuthToken.split(" ")[1];
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username

    const admin = await Admin.findOne({ username: username })

    if (admin) {
        next()
    } else {
        res.status(403).json({ msg: "Not an admin user" });
    }
}

module.exports = adminMiddleware;