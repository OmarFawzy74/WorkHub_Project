
import express from "express";
import auth from '../../middleware/auth.middleware.js'
import { validateParams, validation } from "../../middleware/val.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addProfessors, deleteProfessors, getAllProfessors, updateProfessors } from "./professorsController.js";
import { ProfessorsSchema, updateProfessorsSchema } from "./professorsSchema.js";
import endPoints from "../../middleware/endPoints.js";

const router = express.Router();

router.get("/getAllProfessors", auth(endPoints.allUsers), asyncHandler(getAllProfessors));
router.post("/addProfessors", validation(ProfessorsSchema), auth(endPoints.admin), asyncHandler(addProfessors));
router.put("/updateProfessors/:id", validation(updateProfessorsSchema), validateParams(), auth(endPoints.admin), asyncHandler(updateProfessors));
router.delete("/deleteProfessors/:id", validateParams(), auth(endPoints.admin), asyncHandler(deleteProfessors));

export default router;