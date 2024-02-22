
import express from "express";
import { validation } from "../../middleware/val.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addClient, deleteClient, getAllClients, updateClient } from "./clientsController.js";
import { clientSchema } from "./clientsSchema.js";

const router = express.Router();

router.get("/getAllClients", asyncHandler(getAllClients));
router.post("/addClient", validation(clientSchema), asyncHandler(addClient));
router.put("/updateClient/:id", validation(clientSchema), asyncHandler(updateClient));
router.delete("/deleteClient/:id", asyncHandler(deleteClient));


export default router;