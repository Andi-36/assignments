const { Router } = require("express");
const { User, Course } = require("../db");
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    const userExist = await User.findOne({ username: username })

    if (userExist) {
        return res.status(400).send("Ussername already exist")
    }

    const user = new User({
        username: username,
        password: password
    })

    await user.save();

    return res.status(200).json({
        message: 'User created successfully'
    })

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const allCourses = await Course.find({})
    return res.json({
        courses: allCourses
    })

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
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

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
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