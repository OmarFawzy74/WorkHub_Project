import express from "express";
import auth from '../../middleware/auth.middleware.js'
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addChatbotResponse, addUserMessage, getAllConversations, getConversationsByUserId } from "./chatbotConversationController.js";

const router = express.Router();

router.get("/getAllConversations", asyncHandler(getAllConversations)); // auth(endPoints.admin),
router.get("/getConversationsByUserId/:id/:role", asyncHandler(getConversationsByUserId)); // auth(endPoints.admin),
router.post("/addUserMessage", asyncHandler(addUserMessage)); // auth(endPoints.allUsers),
router.post("/addChatbotResponse", asyncHandler(addChatbotResponse)); // auth(endPoints.allUsers),

export default router;