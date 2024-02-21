const { Router } = require("express");
const { Admin, Course } = require("../db");
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const userExist = await Admin.findOne({ username: username })
    if (userExist) {
        return res.status(400).send("Username already exist")
    }

    const admin = new Admin({
        username: username,
        password: password
    })

    await admin.save();

    return res.status(200).json({
        message: 'Admin created successfully'
    })

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    const published = req.body.published;
    const newCourse = new Course({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink,
        published: published
    })
    await newCourse.save();
    return res.json({ message: 'Course created successfully', courseId: `${newCourse._id}` })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find({})

    return res.json({
        courses: allCourses
    })

});

module.exports = router;