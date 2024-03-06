
import express from "express";
import { validateParams, validation } from "../../middleware/val.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addOrder, deleteOrder, getAllOrders, updateOrder } from "./ordersController.js";
import { orderSchema } from "./ordersSchema.js";
import auth from '../../middleware/auth.middleware.js';
import endPoints from "../../middleware/endPoints.js";

const router = express.Router();

router.get("/getAllOrders", auth(endPoints.admin), asyncHandler(getAllOrders));
router.post("/addOrder", validation(orderSchema), auth(endPoints.admin), asyncHandler(addOrder));
router.put("/updateOrder/:id", validateParams(), validation(orderSchema), auth(endPoints.admin), asyncHandler(updateOrder));
router.delete("/deleteOrder/:id", validateParams(), auth(endPoints.admin), asyncHandler(deleteOrder));


export default router;