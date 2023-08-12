const router = require("express").Router();
const StudentCourse = require("../models/StudentCourse");
// const handleError = require("../utils/eventErrors");

router.get('/getcourse', async (req, res) => {
    try {
        const courses = await StudentCourse.find(); // This will fetch all the courses in the database
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.post("/addcourse", async(req, res)=>{
    try {
        const newCourse = new StudentCourse(req.body);
        const savedCourse = await newCourse.save();
        res.status(200).json(savedCourse);
    } catch (err) {
        // If there's an error, handle it here.
        // You can either use your handleError function or send an error response directly.
        res.status(500).json({ error: "Internal Server Error" });
    }   
}
)

module.exports = router;