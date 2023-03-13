import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { CreateOrder, getOrders } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/:gigId", verifyToken, CreateOrder);
router.get("/", verifyToken, getOrders);

export default router;
