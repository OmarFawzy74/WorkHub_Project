
import express from "express";
import login from '../../../login.js'
import signup from '../../../singup.js'
import auth from '../../middleware/auth.middleware.js'
import valMiddleware from '../../middleware/val.middleware.js'
import { updateClientInfo, updateClientPassword } from './clientsController.js'
import endPoints from "../../middleware/endPoints.js";
import { loginSchema, sigupSchema, updatePasswordSchema } from '../validation/validation.js'
import { validateParams } from "../../middleware/val.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { deleteClient, getAllClients } from "./clientsController.js";
import { updateInfoSchema } from "./clientsSchema.js";
import { upload } from "../../middleware/uploadImages.js";
import logout from "../../../logout.js";

const router = express.Router();

router.get("/getAllClients", auth(endPoints.admin), asyncHandler(getAllClients));
router.post('/signup/:role', valMiddleware(sigupSchema), signup);
router.post('/login', valMiddleware(loginSchema), login);
router.put('/updateClientInfo/:id', validateParams(), valMiddleware(updateInfoSchema), auth(endPoints.client), upload.single('image'), updateClientInfo);
router.put('/updateClientPassword/:id', validateParams(), valMiddleware(updatePasswordSchema), auth(endPoints.client), updateClientPassword);
router.put("/logout/:id", validateParams(), auth(endPoints.client), asyncHandler(logout));
router.delete("/deleteClient/:id", validateParams(), asyncHandler(deleteClient));

export default router;