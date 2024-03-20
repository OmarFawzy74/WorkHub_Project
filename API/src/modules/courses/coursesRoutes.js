
import express from "express";
import auth from '../../middleware/auth.middleware.js'
import { validateParams, validation } from "../../middleware/val.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addCourse, deleteCourse, getAllCourses, updateCourse } from "./CoursesController.js";
import { CoursesSchema, updateCoursesSchema } from "./CoursesSchema.js";
import endPoints from "../../middleware/endPoints.js";

const router = express.Router();

router.get("/getAllCourses", auth(endPoints.allUsers), asyncHandler(getAllCourses));
router.post("/addCourses", validation(CoursesSchema), auth(endPoints.admin), asyncHandler(addCourse));
router.put("/updateCourses/:id", validation(updateCoursesSchema), validateParams(), auth(endPoints.admin), asyncHandler(updateCourse));
router.delete("/deleteCourses/:id", validateParams(), auth(endPoints.admin), asyncHandler(deleteCourse));

export default router;