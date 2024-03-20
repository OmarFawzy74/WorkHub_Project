
import express from "express";
import { validation } from "../../middleware/val.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addMessage, deleteMessage, getAllMessages, getMessagesByConversationId, updateMessage } from "./messagesController.js";
import { addMessageSchema } from "./messagesSchema.js";
import endPoints from "../../middleware/endPoints.js";
import auth from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get("/getAllMessages", asyncHandler(getAllMessages));//auth(endPoints.admin),
router.get("/getConversationMessages/:id", asyncHandler(getMessagesByConversationId));// auth(endPoints.allUsersExceptAdmin),
router.post("/addMessage", validation(addMessageSchema), asyncHandler(addMessage));// auth(endPoints.allUsersExceptAdmin),
router.put("/updateMessage/:id", asyncHandler(updateMessage));//auth(endPoints.allUsersExceptAdmin),
router.delete("/deleteMessage/:id", asyncHandler(deleteMessage));//auth(endPoints.allUsersExceptAdmin),
export default router;

// Unfinished Tasks

// Check the Roles of (Add Message, Update Message, Delete Message)