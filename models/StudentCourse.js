const mongoose = require("mongoose");

const studentCourseSchema = new mongoose.Schema({
    emailid : {type: String, required:true},
    title : {type: String, required:true}
})

module.exports = mongoose.model("StudentCourses", studentCourseSchema);