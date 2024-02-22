
import express from "express";
import { validation } from "../../middleware/val.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addCategory, deleteCategory, getAllCategories, updateCategory } from "./categoriesController.js";
import { addCategorySchema } from "./categoriesSchema.js";

const router = express.Router();

router.get("/getAllCategories", asyncHandler(getAllCategories));
router.post("/addCategory", validation(addCategorySchema), asyncHandler(addCategory));
router.put("/updateCategory/:id", asyncHandler(updateCategory)); // Q
router.delete("/deleteCategory/:id", asyncHandler(deleteCategory));


export default router;