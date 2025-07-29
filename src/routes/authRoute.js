import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/authController.js';
import { validateRegisterInput, validateLoginInput } from '../middlewares/inputValidate.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post("/register", validateRegisterInput, registerUser);
router.post("/login", validateLoginInput, loginUser);

// Protected routes
router.get("/profile", authMiddleware, getProfile);

export default router;