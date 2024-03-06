
import express from "express";
import { validation } from "../../middleware/val.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addCategory, deleteCategory, getAllCategories, updateCategory } from "./categoriesController.js";
import { addCategorySchema } from "./categoriesSchema.js";
import endPoints from "../../middleware/endPoints.js";
import auth from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get("/getAllCategories", auth(endPoints.admin), asyncHandler(getAllCategories));
router.post("/addCategory", validation(addCategorySchema), auth(endPoints.admin), asyncHandler(addCategory));
router.put("/updateCategory/:id", auth(endPoints.admin), asyncHandler(updateCategory));
router.delete("/deleteCategory/:id", auth(endPoints.admin), asyncHandler(deleteCategory));


export default router;