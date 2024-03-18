
import express from "express";
import login from '../../../login.js'
import signup from '../../../singup.js'
// import auth from '../../middleware/auth.middleware.js'
import valMiddleware, { validateParams } from '../../middleware/val.middleware.js'
import { loginSchema, sigupSchema, updatePasswordSchema } from '../validation/validation.js'
import { getAllFreelancers, deleteFreelancer, updateFreelancerInfo, updateFreelancerPassword } from './freelancerController.js'
import { asyncHandler } from "../../utils/asyncHandler.js";
// import endPoints from "../../middleware/endPoints.js";
import { updateInfoSchema } from "./freelancersSchema.js";
import { upload } from "../../middleware/uploadImages.js";
import logout from "../../../logout.js";

const router = express.Router();

<<<<<<< HEAD
router.get('/getAllFreelancers',  getAllFreelancers);
router.post('/signup/:role', valMiddleware(sigupSchema), signup);
router.post('/login/:role', valMiddleware(loginSchema), login);
router.put('/updateFreelancerInfo/:id', validateParams(), valMiddleware(updateInfoSchema),  upload.single('image'), updateFreelancerInfo);
router.put('/updateFreelancerPassword/:id', validateParams(), valMiddleware(updatePasswordSchema),  updateFreelancerPassword);
router.put("/logout/:id", validateParams(),  asyncHandler(logout));
router.delete("/deleteFreelancer/:id", validateParams(),  asyncHandler(deleteFreelancer));
=======
router.get('/getAllFreelancers', getAllFreelancers);
router.post('/signup/:role', valMiddleware(sigupSchema), signup);
router.post('/login/:role', valMiddleware(loginSchema), login);
router.put('/updateFreelancerInfo/:id', validateParams(), valMiddleware(updateInfoSchema), upload.single('image'), updateFreelancerInfo);
router.put('/updateFreelancerPassword/:id', validateParams(), valMiddleware(updatePasswordSchema), updateFreelancerPassword);
router.put("/logout/:id", validateParams(), asyncHandler(logout));
router.delete("/deleteFreelancer/:id", validateParams(), asyncHandler(deleteFreelancer));
>>>>>>> c8c75bd8ae3ce37c33c846058f2fe780350bfe79

export default router;