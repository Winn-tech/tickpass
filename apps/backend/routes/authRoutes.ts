import { Router } from "express";
const router = Router();
import { signUp, signIn} from "../controllers/authController";

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);

export const authRoutes = router;