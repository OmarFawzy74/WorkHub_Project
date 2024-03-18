
import express from "express";
// import auth from '../../middleware/auth.middleware.js'
import valMiddleware, { validateParams } from '../../middleware/val.middleware.js'
import { updatePasswordSchema } from '../validation/validation.js'
import { getAllFreelancers, deleteFreelancer, updateFreelancerInfo, updateFreelancerPassword } from './freelancerController.js'
import { asyncHandler } from "../../utils/asyncHandler.js";
// import endPoints from "../../middleware/endPoints.js";
import { updateInfoSchema } from "./freelancersSchema.js";
import { upload } from "../../middleware/uploadImages.js";
import logout from "../../../logout.js";

const router = express.Router();

router.get('/getAllFreelancers',  getAllFreelancers);
router.put('/updateFreelancerInfo/:id', validateParams(), valMiddleware(updateInfoSchema),  upload.single('image'), updateFreelancerInfo);
router.put('/updateFreelancerPassword/:id', validateParams(), valMiddleware(updatePasswordSchema),  updateFreelancerPassword);
router.delete("/deleteFreelancer/:id", validateParams(),  asyncHandler(deleteFreelancer));


export default router;