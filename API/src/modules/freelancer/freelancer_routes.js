
import express from "express";
import login from '../../../login.js'
import signup from '../../../singup.js'
import auth from '../../middleware/auth.middleware.js'
import valMiddleware, { validateParams } from '../../middleware/val.middleware.js'
import { loginSchema, sigupSchema, updatePasswordSchema } from '../validation/validation.js'
import { uploadImage, getAllFreelancers, createInforForFreelancer, getFreelancerInfo, deleteFreelancer, updateFreelancerInfo, updateFreelancerPassword } from './freelancerController.js'
import { asyncHandler } from "../../utils/asyncHandler.js";
import endPoints from "../../middleware/endPoints.js";
import { updateInfoSchema } from "./freelancersSchema.js";
import { upload } from "../../middleware/uploadImages.js";

const router = express.Router();

router.get('/getAllFreelancers', auth(endPoints.admin), getAllFreelancers);
router.post('/signup/:role', valMiddleware(sigupSchema), signup);
router.post('/login/:role', valMiddleware(loginSchema), login);
router.put('/updateFreelancerInfo/:id', validateParams(), valMiddleware(updateInfoSchema), auth(endPoints.freelancer), upload.single('image'), updateFreelancerInfo);
router.put('/updateFreelancerPassword/:id', validateParams(), valMiddleware(updatePasswordSchema), auth(endPoints.freelancer), updateFreelancerPassword);
// router.patch('/user/freelancer/pic', auth(endPoint.uploadImage), uploadImage);
// router.post('/user/freelancer/createInfo', auth(endPoint.createInformation), createInforForFreelancer);
// router.get('/user/freelancer/getAllInfoAboutFreelancer/:id', auth(endPoint.getAllInfoAboutFreelancer), getFreelancerInfo);

router.delete("/deleteFreelancer/:id", validateParams(), auth(endPoints.admin), asyncHandler(deleteFreelancer));

export default router;