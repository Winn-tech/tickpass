import { Router } from "express";
const router = Router();
import { signup } from "../controllers/authController";

router.route("/signup").post(signup);

export const authRoutes = router;