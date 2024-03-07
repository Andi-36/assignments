const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { Course, User } = require("../db");
const { jwtPassword } = require("../db/jwtConfig");
const adminMiddleware = require("../middleware/admin");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username: username,
        password: password
    })

    res.json({ message: 'User created successfully' })
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = User.findOne({ username: username, password: password });
    if (user) {
        const token = jwt.sign({ username: username }, jwtPassword);
        res.json({
            token
        })
    } else {
        res.json({
            msg: "User not found"
        })
    }
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    const allCourses = await Course.find({})

    return res.json({
        courses: allCourses
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await User.updateOne(({
        username
    }, {
        $push: {
            purchasedCourses: courseId
        }
    }))
    return res.json({ message: 'Course purchased successfully' })
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    })

    const coursesPurchased = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    return res.json({
        coursesPurchased
    })
});

module.exports = router