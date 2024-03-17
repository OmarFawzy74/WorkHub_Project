
import express from "express";
import auth from '../../middleware/auth.middleware.js'
import { validateParams, validation } from "../../middleware/val.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addConversation, deleteConversation, getAllConversations, getConversationById, updateConversation } from "./conversationsController.js";
import { conversationSchema, updateConversationSchema } from "./conversationsSchema.js";
import endPoints from "../../middleware/endPoints.js";

const router = express.Router();

router.get("/getAllConversations", auth(endPoints.admin), asyncHandler(getAllConversations));
router.get("/getConversationById/:id", auth(endPoints.admin), asyncHandler(getConversationById));
router.post("/addConversation", validation(conversationSchema), auth(endPoints.allUsers), asyncHandler(addConversation));
router.put("/updateConversation/:id", validation(updateConversationSchema), validateParams(), auth(endPoints.allUsers), asyncHandler(updateConversation));
router.delete("/deleteConversation/:id", validateParams(), auth(endPoints.allUsers), asyncHandler(deleteConversation));

export default router;

// Unfinished Tasks

// Check the Roles of (Add Conversation, Update Conversation, Delete Conversation)