
import express from "express";
import login from '../../../login.js';
import logout from '../../../logout.js';
import valMiddleware, { validateParams } from '../../middleware/val.middleware.js';
import { loginSchema, sigupSchema, updatePasswordSchema } from '../validation/validation.js';
import { addAdmin, deleteAdmin, getAllAdmins, updateAdminInfo, updateAdminPassword } from './adminController.js';
import { asyncHandler } from "../../utils/asyncHandler.js";
import { updateInfoSchema } from "./adminSchema.js";
import auth from "../../middleware/auth.middleware.js";
import endPoints from "../../middleware/endPoints.js";

const router = express.Router();

router.get('/getAllAdmins', auth(endPoints.admin), getAllAdmins);
router.post('/addAdmin', valMiddleware(sigupSchema), addAdmin);
router.post('/login', valMiddleware(loginSchema), login);

router.put("/logout/:id", validateParams(), auth(endPoints.admin), asyncHandler(logout));

router.put("/updateAdminInfo/:id", validateParams(), valMiddleware(updateInfoSchema), auth(endPoints.admin), asyncHandler(updateAdminInfo));
router.put("/updateAdminPassword/:id", validateParams(), valMiddleware(updatePasswordSchema), auth(endPoints.admin), asyncHandler(updateAdminPassword));
router.delete("/deleteAdmin/:id", validateParams(), auth(endPoints.admin), asyncHandler(deleteAdmin));

export default router;