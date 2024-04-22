
import course from "../../../DB/models/course_model.js";

// Unfinished Tasks

// 1. Check Authentication
// 2. Check Authorization

// Get All courses
export const getAllCourses = async (req, res) => {
    try {
        const allCourses = await course.find();

        if (allCourses.length == 0) {
            return res.status(404).json({ msg: "No Courses Found!" });
        }

        res.status(200).json({ success: true, message: allCourses });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg:"Somthing went wrong!" });
    }
}

// Get Courses By Freelancer ID Or Client ID
export const getEnrolledCourses = async (req, res) => {
    const filter = {freelancerId: req.params.id};
    const enrolledCourses = await course.find(filter);

    if (enrolledCourses.length == 0) {
        return next(new Error("Courses Not found :("))
    }

    res.status(200).json({ success: true, message: allCourses });
}

// Add courses
export const addCourse = async (req, res) => {
    try {
        const courseTitle = { courseTitle: req.body.courseTitle };
        const data = await course.find(courseTitle);
    
        if (data.length !== 0) {
            return res.status(404).json({ msg: "Course has been Already Created!", newCourse });
        }
    
        const newCourse = new course({
            ...req.body,
        })

        await newCourse.save();
        return res.status(200).json({ msg: "course has been created successfuly.", newCourse });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg:"Somthing went wrong!" });
    }
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

export const uploadCourseCoverImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(404).json({ success: false, msg: "Cover image is required" });
        }

        const id = req.params.id;

        if (id == undefined) {
            return res.status(404).json({ success: false, msg: "id is required" });
        }

        const cover_url = req.file.filename;

        const filter = { _id: id };
        const update = { $set: { courseCoverImage_url: cover_url } };

        await course.updateOne(filter, update);

        res.status(200).json({ msg: "image uploaded successfuly" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false, message: "Server Error" });
    }
};

export const uploadProffImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(404).json({ success: false, message: "Cover image is required" });
        }

        const id = req.params.id;

        if (id == undefined) {
            return res.status(404).json({ success: false, message: "id is required" });
        }

        const cover_url = req.file.filename;

        const filter = { _id: id };
        const update = { $set: { serviceCover_url: cover_url } };

        await Service.updateOne(filter, update);


        res.status(200).json({ msg: "image uploaded successfuly" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false, message: "Server Error" });
    }
};

