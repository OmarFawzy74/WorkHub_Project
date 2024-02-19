import { Router } from "express";
import * as noteController from "./note.controller.js"
import { asyncHandler } from "../../utils/asyncHandler.js";
import { isAuthenticated } from "../../middleware/auth.middleware.js";
import { validation } from "../../middleware/val.middleware.js";
import { addNoteSchema, deleteNoteSchema, updateNoteSchema } from "./note.schema.js";
const router = Router();

//creatNote
router.post("/", isAuthenticated, validation(addNoteSchema), asyncHandler(noteController.addNote));
//updateNote
router.patch("/:id", isAuthenticated, validation(updateNoteSchema), asyncHandler(noteController.updateNote));

//deleteNote
router.delete("/:id", isAuthenticated, validation(deleteNoteSchema), asyncHandler(noteController.deleteNote));

//getNoteWithUserId
router.get("/", isAuthenticated, asyncHandler(noteController.getNotesWithUserId));


//add to favorite
router.post("/:id/favorite", isAuthenticated, asyncHandler(noteController.addToFavorite));

//get all favorites notes
router.get("/favorites", isAuthenticated, asyncHandler(noteController.getAllFavorite));

//getAllNote
// router.get("/",isAuthenticated,asyncHandler (noteController.getAllNotes));
export default router;