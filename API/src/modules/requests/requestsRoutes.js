
import express from "express";
import { validateParams, validation } from "../../middleware/val.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addRequest, deleteRequest, getAllRequests, updateRequest } from "./requestsController.js";
import { requestSchema, updateRequestSchema } from "./requestsSchema.js";

const router = express.Router();

router.get("/getAllRequests", asyncHandler(getAllRequests));
router.post("/addRequest", validation(requestSchema), asyncHandler(addRequest));
router.put("/updateRequest/:id", validation(updateRequestSchema), validateParams(), asyncHandler(updateRequest));
router.delete("/deleteRequest/:id", validateParams(), asyncHandler(deleteRequest));


export default router;