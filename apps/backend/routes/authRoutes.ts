// import { Router } from "express";
// const router = Router();
// import { signUp, signIn} from "../controllers/authController";

// router.route("/signup").post(signUp);
// router.route("/signin").post(signIn);

// export const authRoutes = router;
import { Router } from 'express'
import {
  signUp,
  signIn,
  signOut,
  getMe,
  protect,
  invalidateTokens
} from '../controllers/authController'

const router = Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/signout', signOut)

// Protected routes
router.get('/me', protect, getMe)
router.post('/invalidate-tokens', protect, invalidateTokens)

export const authRoutes = router
