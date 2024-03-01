
import express from "express";
import login from '../../../login.js'
import signup from '../../../singup.js'
import auth from '../../middleware/auth.middleware.js'
import valMiddleware from '../../middleware/val.middleware.js'
import validations from '../validation/validation.js'
import endPoint from './endpoint.js'
import { uploadImage, allFreelancer, createInforForFreelancer, getFreelancerInfo } from './freelancerController.js'

const router = express.Router();

router.post('/user/freelancer/signup/:role', valMiddleware(validations.sigupSchema), signup);
router.post('/user/freelancer/login/:role', valMiddleware(validations.loginSchema), login);
router.patch('/user/freelancer/pic', auth(endPoint.uploadImage), uploadImage)
router.get('/user/freelancer/allfreelancers', auth(endPoint.allfreelacer), allFreelancer)
router.post('/user/freelancer/createInfo', auth(endPoint.createInformation), createInforForFreelancer)
router.get('/user/freelancer/getAllInfoAboutFreelancer/:id', auth(endPoint.getAllInfoAboutFreelancer), getFreelancerInfo);

export default router;