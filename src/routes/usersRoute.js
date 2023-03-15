import  express from "express";
import { loginUser, registerUser, forgotPassword } from "../controllers/usersController.js";

const router = express.Router()

router.post("/login", loginUser)
router.post("/register", registerUser)
router.post("/forgot", forgotPassword)

export default router