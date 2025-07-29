// standardize response

import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../models/userModel.js";

const response = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

export const createUserService = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await createUser(name, email, password);
        response(res, 201, "User created successfully", newUser);
    } catch (error) {
        next(error);
    }
}

export const getAllUsersService = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        response(res, 200, "Users retrieved successfully", users);
    } catch (error) {
        next(error);
    }
};

export const updateUserService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const updatedUser = await updateUser(id, name, email);
        if (!updatedUser) {
            return response(res, 404, "User not found");
        }
        response(res, 200, "User updated successfully", updatedUser);
    } catch (error) {
        next(error);
    }
}

export const deleteUserService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedUser = await deleteUser(id);
        if (!deletedUser) {
            return response(res, 404, "User not found");
        }
        response(res, 200, "User deleted successfully", deletedUser);
    } catch (error) {
        next(error);
    }
};

export const getUserByIdService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        if (!user) {
            return response(res, 404, "User not found");
        }
        response(res, 200, "User retrieved successfully", user);
    } catch (error) {
        next(error);
    }
}