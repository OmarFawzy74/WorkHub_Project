
import express from "express";
import auth from '../../middleware/auth.middleware.js'
import { validateParams, validation } from "../../middleware/val.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addCommunity, deleteCommunity, getAllCommunities, updateCommunity } from "./communitiesController.js";
import { communitySchema, updateCommunitySchema } from "./communitiesSchema.js";
import endPoints from "../../middleware/endPoints.js";

const router = express.Router();

router.get("/getAllCommunities", asyncHandler(getAllCommunities));
router.post("/addCommunity", validation(communitySchema), asyncHandler(addCommunity));
router.put("/updateCommunity/:id", validation(updateCommunitySchema), validateParams(), asyncHandler(updateCommunity));
router.delete("/deleteCommunity/:id", validateParams(), asyncHandler(deleteCommunity));

export default router;