import express from "express";
import {
  getAllUsers,
  getUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", verifyToken, getAllUsers);
router.get("/:userId", verifyToken, getUser);
router.delete("/:userId", verifyToken, deleteUser);

export default router;
