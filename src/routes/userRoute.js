import express from 'express';
import { createUserService, deleteUserService, getAllUsersService, getUserByIdService, updateUserService } from '../controllers/userController.js';
import validateUserInput from '../middlewares/inputValidate.js';

const router = express.Router();

router.post("/user", validateUserInput, createUserService);
router.get("/user", validateUserInput, getAllUsersService);
router.put("/user/:id", validateUserInput, updateUserService);
router.delete("/user/:id", validateUserInput, deleteUserService);
router.get("/user/:id", validateUserInput, getUserByIdService);

export default router;