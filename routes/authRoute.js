import express from "express";
import { Login, logOut, Me, register } from "../controllers/auth.js";

const router = express.Router();

router.get("/me", Me);
router.post("/login", Login);
router.post("/register", register);
router.delete("/logout", logOut);

export default router;
