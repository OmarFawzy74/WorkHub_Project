
import express from "express";
import login from '../../../login.js'
import signup from '../../../singup.js'
import auth from '../../middleware/auth.middleware.js'
import valMiddleware from '../../middleware/val.middleware.js'
import allClients from './clientsController.js'
import endPoint from './endpoint.js'
import validations from '../validation/validation.js'
import { validateParams, validation } from "../../middleware/val.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addClient, deleteClient, getAllClients, updateClient } from "./clientsController.js";
import { clientSchema, updateClientSchema } from "./clientsSchema.js";

const router = express.Router();

router.get("/getAllClients", asyncHandler(getAllClients));
router.post("/addClient", validation(clientSchema), asyncHandler(addClient));
router.put("/updateClient/:id", validation(updateClientSchema), validateParams(), asyncHandler(updateClient));
router.delete("/deleteClient/:id", validateParams(), asyncHandler(deleteClient));

router.post('/user/client/signup/:role', valMiddleware(validations.sigupSchema), signup)
router.post('/login/:role', valMiddleware(validations.loginSchema), login);
router.get('/user/client/allclients', auth(endPoint.allClients), allClients);

export default router;