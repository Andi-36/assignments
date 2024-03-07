const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { Admin, Course } = require("../db");
const { jwtPassword } = require("../db/jwtConfig");
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username: username,
        password: password
    })

    res.json({ message: 'Admin created successfully' })
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const admin = Admin.findOne({username: username, password: password});
    if(admin){
        const token = jwt.sign({ username: username }, jwtPassword);
        res.json({
            token
        })
    }else {
        res.json({
           msg: "User not found"
        })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    const published = req.body.published;
    const newCourse = await Course.create({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink,
        published: published
    })
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