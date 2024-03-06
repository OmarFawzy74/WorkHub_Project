
import express from "express";
import login from '../../../login.js'
import signup from '../../../singup.js'
import auth from '../../middleware/auth.middleware.js'
import valMiddleware, { validateParams } from '../../middleware/val.middleware.js'
import { loginSchema, sigupSchema } from '../validation/validation.js'
import { uploadImage, getAllFreelancers, createInforForFreelancer, getFreelancerInfo, deleteFreelancer } from './freelancerController.js'
import { asyncHandler } from "../../utils/asyncHandler.js";
import endPoints from "../../middleware/endPoints.js";

const router = express.Router();

router.get('/getAllFreelancers', auth(endPoints.admin), getAllFreelancers);
router.post('/signup/:role', valMiddleware(sigupSchema), signup);
router.post('/login/:role', valMiddleware(loginSchema), login);
router.put('updateFreelancer/:id', );
// router.patch('/user/freelancer/pic', auth(endPoint.uploadImage), uploadImage);
// router.post('/user/freelancer/createInfo', auth(endPoint.createInformation), createInforForFreelancer);
// router.get('/user/freelancer/getAllInfoAboutFreelancer/:id', auth(endPoint.getAllInfoAboutFreelancer), getFreelancerInfo);

router.delete("/deleteFreelancer/:id", validateParams(), auth(endPoints.admin), asyncHandler(deleteFreelancer));

export default router;