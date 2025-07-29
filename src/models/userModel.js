import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async () => {
    const result = await pool.query('SELECT id, name, email, created_at FROM users');
    return result.rows;
};

export const createUser = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
        [name, email, hashedPassword]
    );
    return result.rows[0];
};

export const updateUser = async (id, name, email) => {
    const result = await pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, created_at',
        [name, email, id]
    );
    return result.rows[0];
};

export const deleteUser = async (id) => {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id, name, email, created_at', [id]);
    return result.rows[0];
};

export const getUserById = async (id) => {
    const result = await pool.query('SELECT id, name, email, created_at FROM users WHERE id = $1', [id]);
    return result.rows[0];
};

// Authentication-related functions
export const getUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

export const verifyPassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};