
import express from "express";
import { validateParams, validation } from "../../middleware/val.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addOrder, deleteOrder, getAllOrders, updateOrder } from "./ordersController.js";
import { orderSchema } from "./ordersSchema.js";

const router = express.Router();

router.get("/getAllOrders", asyncHandler(getAllOrders));
router.post("/addOrder", validation(orderSchema), asyncHandler(addOrder));
router.put("/updateOrder/:id", validation(orderSchema), validateParams(), asyncHandler(updateOrder));
router.delete("/deleteOrder/:id", validateParams(), asyncHandler(deleteOrder));


export default router;