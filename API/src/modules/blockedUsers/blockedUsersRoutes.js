
import express from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { blockUser, checkIfBlocked, getBlockedUsers } from "./blockedUsersController.js";

const router = express.Router();

router.get("/getBlockedUsers", asyncHandler(getBlockedUsers));// auth(endPoints.admin),
router.get("/checkIfBlocked/:id", asyncHandler(checkIfBlocked));// auth(endPoints.admin),
router.post("/blockUser/:id", asyncHandler(blockUser));// auth(endPoints.admin),


export default router;
