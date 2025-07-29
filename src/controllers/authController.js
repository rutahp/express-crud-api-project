import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail, verifyPassword } from '../models/userModel.js';

const response = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return response(res, 400, "User with this email already exists");
        }
        
        // Create new user
        const newUser = await createUser(name, email, password);
        
        // Generate token
        const token = generateToken(newUser.id);
        
        response(res, 201, "User registered successfully", {
            user: newUser,
            token
        });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await getUserByEmail(email);
        if (!user) {
            return response(res, 401, "Invalid email or password");
        }
        
        // Verify password
        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return response(res, 401, "Invalid email or password");
        }
        
        // Generate token
        const token = generateToken(user.id);
        
        // Remove password from user object
        const { password: _, ...userWithoutPassword } = user;
        
        response(res, 200, "Login successful", {
            user: userWithoutPassword,
            token
        });
    } catch (error) {
        next(error);
    }
};

export const getProfile = async (req, res, next) => {
    try {
        // User is already attached to req by authMiddleware
        response(res, 200, "Profile retrieved successfully", req.user);
    } catch (error) {
        next(error);
    }
};