
import express from "express";
import auth from '../../middleware/auth.middleware.js'
import { validateParams, validation } from "../../middleware/val.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addCourse, deleteCourse, getAllCourses, getCourseById, updateCourse, uploadCourseCoverImage, uploadProffImage } from "./coursesController.js";
import { CoursesSchema, updateCoursesSchema } from "./CoursesSchema.js";
import { upload } from "../../middleware/uploadImages.js";
import endPoints from "../../middleware/endPoints.js";

const router = express.Router();

router.get("/getAllCourses", asyncHandler(getAllCourses)); // auth(endPoints.allUsers),
router.get("/getCourseById/:id", asyncHandler(getCourseById)); // auth(endPoints.allUsers),
router.post("/addCourse", validation(CoursesSchema), asyncHandler(addCourse)); // auth(endPoints.admin),
router.put("/updateCourses/:id", validation(updateCoursesSchema), validateParams(), asyncHandler(updateCourse));
router.put("/uploadCourseCoverImage/:id", upload.single('coverImage'), asyncHandler(uploadCourseCoverImage));
router.put("/uploadProffImage/:id", upload.single('image'), asyncHandler(uploadProffImage));
router.delete("/deleteCourses/:id", validateParams(), asyncHandler(deleteCourse));

export default router;