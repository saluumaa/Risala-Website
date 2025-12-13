import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controller.js';
import { validateToken } from '../utils/validateToken.js';
import { adminVerification } from '../utils/adminVerification.js';

const router = express.Router();

// Admin-only: Get all users
router.get('/', validateToken, adminVerification, getUsers);

// Users can get their own profile, admins can get any
router.get('/:id', validateToken, getUser);

// Users can update their own profile, admins can update any
router.put('/:id', validateToken, updateUser);

// Admin-only: Delete users
router.delete('/:id', validateToken, adminVerification, deleteUser);

export default router;