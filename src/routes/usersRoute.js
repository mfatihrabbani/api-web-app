import  express from "express";
import { loginUser, registerUser , createForgotPassword, forgotPassword } from "../controllers/usersController.js";

const router = express.Router()

router.post("/login", loginUser)
router.post("/register", registerUser)
router.post("/forgot", createForgotPassword)
router.post("/forgot/:token", forgotPassword)

export default router
