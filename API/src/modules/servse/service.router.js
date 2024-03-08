
import express from "express";
import auth from '../../middleware/auth.middleware.js'
import { validateParams, validation } from "../../middleware/val.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as serviceController from "./service.controller.js"
import endPoints from "../../middleware/endPoints.js";

const router = express.Router();

router.get("/", auth(endPoints.allUsers), asyncHandler(serviceController.getAllServices));
router.get("/:serviceId", auth(endPoints.allUsers), asyncHandler(serviceController.getServiceById));
router.post("/", auth(endPoints.allUsers), asyncHandler(serviceController.createService));
router.put("/:id", auth(endPoints.allUsers), asyncHandler(serviceController.updateService));
router.delete("/:id", auth(endPoints.allUsers), asyncHandler(serviceController.deleteService));

export default router;