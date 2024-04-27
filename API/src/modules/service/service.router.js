
import express from "express";
import { validation } from "../../middleware/val.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as serviceController from "./service.controller.js";
import { createService, updateServiceSchema } from "./service.Schema.js";
import { upload } from "../../middleware/uploadImages.js";

const router = express.Router();

router.get("/getAllServices", asyncHandler(serviceController.getAllServices));
router.get("/getFreelancerServices/:id", asyncHandler(serviceController.getFreelancerServices));
router.get("/getServiceById/:id", asyncHandler(serviceController.getServiceById));
router.get("/getServiceById/:id", asyncHandler(serviceController.getServiceById));
router.put("/updateService/:id", asyncHandler(serviceController.updateService));
router.put("/uploadCoverImage/:id", upload.single('coverImage'), asyncHandler(serviceController.uploadCoverImage));
router.put("/uploadImages/:id", upload.array('images'), asyncHandler(serviceController.uploadImages));
// router.put("/:id", validation(updateServiceSchema), asyncHandler(serviceController.updateService));
router.delete("/deleteService/:id", asyncHandler(serviceController.deleteService));

export default router;