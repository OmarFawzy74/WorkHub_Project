
import express from "express";
import { validateParams, validation } from "../../middleware/val.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addRequest, deleteRequest, getAllRequests, updateRequestStatus } from "./requestsController.js";
import { requestSchema, updateRequestSchema } from "./requestsSchema.js";
import endPoints from "../../middleware/endPoints.js";
import auth from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get("/getAllRequests", auth(endPoints.admin), asyncHandler(getAllRequests));
router.post("/addRequest", validation(requestSchema), auth(endPoints.admin), asyncHandler(addRequest));
router.put("/updateRequest/:id", validation(updateRequestSchema), validateParams(), auth(endPoints.admin), asyncHandler(updateRequestStatus));
router.delete("/deleteRequest/:id", validateParams(), auth(endPoints.admin), asyncHandler(deleteRequest));

export default router;