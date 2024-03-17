
import express from "express";
import { validation } from "../../middleware/val.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addMessage, deleteMessage, getAllMessages, getMessagesByConversationId, updateMessage } from "./messagesController.js";
import { addMessageSchema } from "./messagesSchema.js";
import endPoints from "../../middleware/endPoints.js";
import auth from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get("/getAllMessages", auth(endPoints.admin), asyncHandler(getAllMessages));
router.get("/getConversationMessages/:id", auth(endPoints.allUsersExceptAdmin), asyncHandler(getMessagesByConversationId));
router.post("/addMessage", validation(addMessageSchema), auth(endPoints.allUsersExceptAdmin), asyncHandler(addMessage));
router.put("/updateMessage/:id", auth(endPoints.allUsersExceptAdmin), asyncHandler(updateMessage));
router.delete("/deleteMessage/:id", auth(endPoints.allUsersExceptAdmin), asyncHandler(deleteMessage));

export default router;

// Unfinished Tasks

// Check the Roles of (Add Message, Update Message, Delete Message)