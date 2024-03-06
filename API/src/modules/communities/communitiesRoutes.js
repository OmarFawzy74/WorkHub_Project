
import express from "express";
import auth from '../../middleware/auth.middleware.js'
import { validateParams, validation } from "../../middleware/val.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addCommunity, deleteCommunity, getAllCommunities, updateCommunity } from "./communitiesController.js";
import { communitySchema, updateCommunitySchema } from "./communitiesSchema.js";
import endPoints from "../../middleware/endPoints.js";

const router = express.Router();

router.get("/getAllCommunities", auth(endPoints.allUsers), asyncHandler(getAllCommunities));
router.post("/addCommunity", validation(communitySchema), auth(endPoints.admin), asyncHandler(addCommunity));
router.put("/updateCommunity/:id", validation(updateCommunitySchema), validateParams(), auth(endPoints.admin), asyncHandler(updateCommunity));
router.delete("/deleteCommunity/:id", validateParams(), auth(endPoints.admin), asyncHandler(deleteCommunity));

// router.post('/signup/:role', valMiddleware(validations.sigupSchema), signup)
// router.post('/login/:role', valMiddleware(validations.loginSchema), login);

// router.get('/user/community/allcommunitys', auth(endPoint.allCommunity), allCommunity);

export default router;