
import express from "express";
import auth from '../../middleware/auth.middleware.js'
import { validateParams, validation } from "../../middleware/val.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as serviceController from "./service.controller.js"
import endPoints from "../../middleware/endPoints.js";

const router = express.Router();

router.get("/getAllServices", asyncHandler(serviceController.getAllServices)); //auth(endPoints.allUsers)
router.get("/getServiceById/:id", asyncHandler(serviceController.getServiceById));//auth(endPoints.allUsers)
router.post("/createService", asyncHandler(serviceController.createService));//auth(endPoints.allUsers)
router.put("/updateService/:id", asyncHandler(serviceController.updateService));//auth(endPoints.allUsers)
router.delete("/deleteService/:id", asyncHandler(serviceController.deleteService));//auth(endPoints.allUsers)

export default router;