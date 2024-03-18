
import express from "express";
import valMiddleware, { validateParams } from '../../middleware/val.middleware.js';
import { loginSchema, sigupSchema, updatePasswordSchema } from '../validation/validation.js';
import { asyncHandler } from "../../utils/asyncHandler.js";
import auth from "../../middleware/auth.middleware.js";
import endPoints from "../../middleware/endPoints.js";
import login, { logout, signup } from "./authController.js";

const router = express.Router();

router.post('/signup/:role', valMiddleware(sigupSchema), signup);
router.post('/login', valMiddleware(loginSchema), login);
router.put("/logout/:id", validateParams(), asyncHandler(logout)); // auth(endPoints.admin)

export default router;