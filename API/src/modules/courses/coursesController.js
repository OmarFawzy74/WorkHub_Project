
import course from "../../../DB/models/course_model.js";

// Unfinished Tasks

// 1. Check Authentication
// 2. Check Authorization

// Get All courses
export const getAllCourses = async (req, res) => {

    const allCourses = await course.find();
    if (allCourses.length == 0) {
        return next(new Error("Courses Not found :("))
    }

    res.status(200).json({ success: true, message: allCourses });
}

// Get Courses By Freelancer ID Or Client ID
export const getEnrolledCourses = async (req, res) => {
    const filter = {freelancerId: req.params.id};
    const enrolledCourses = await course.find(filter);

    if (allCourses.length == 0) {
        return next(new Error("Courses Not found :("))
    }

    res.status(200).json({ success: true, message: allCourses });
}

// Add courses
export const addCourse = async (req, res) => {

    const courseTitle = { courseTitle: req.body.courseTitle };
    const data = await course.find(courseTitle);

    if (data.length !== 0) {

        return next(new Error("this professor is already exist", 400));
    }

    const newCourse = new course({
        ...req.body,
    })
    await newCourse.save();
    return res.status(200).json({ msg: "course has been created successfuly.", newCourse });

}
// Update course
export const updateCourse = async (req, res) => {

    const courseId = req.params.id;
    const iscourse = await course.findById(courseId);

    if (!iscourse) {
        return next(new Error("courses Not found", { cause: 404 }));
    }
  
    const updatedcourse = await course.findByIdAndUpdate(courseId, req.body, { new: true });
    return res.status(200).json({ msg: "courses has been updated successfuly.", updatedcourse });


}

// Delete courses
export const deleteCourse = async (req, res) => {

    const courseId = req.params.id
    const isCourse = await course.findById(courseId);

    if (isCourse) {
        const filter = { _id: courseId };

        await course.deleteOne(filter);
        res.status(200).json({ msg: "course has been deleted successfuly." });
    }
    else {
        return next(new Error("course not found.", { cause: 404 }));
    }

}

