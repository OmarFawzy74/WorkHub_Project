import { Router } from "express";
import * as userController from "./user.controller.js"
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validation } from "../../middleware/val.middleware.js";
import { signInSchema, signUpSchema } from "./user.schema.js";
const router = Router();

router.post("/signup",validation(signUpSchema),asyncHandler( userController.signup));

router.post("/signin", validation(signInSchema), asyncHandler(userController.signin));



export default router;