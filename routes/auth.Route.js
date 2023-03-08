import express from "express";
import {
  register,
  login,
  registerSeller,
  logout,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/register-seller", registerSeller);
router.post("/login", login);
router.post("/logout", logout);

export default router;
