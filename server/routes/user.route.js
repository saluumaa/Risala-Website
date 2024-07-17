import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controller.js';
import { validateToken } from '../utils/validateToken.js';
const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', validateToken, updateUser);
router.delete('/:id', validateToken, deleteUser);

export default router;