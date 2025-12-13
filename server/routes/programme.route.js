import express from 'express';
import { validateToken } from '../utils/validateToken.js';
import { adminVerification } from '../utils/adminVerification.js';
import { getSettings, updateSettings, toggleActive } from '../controllers/programme.controller.js';

const router = express.Router();

router.get('/settings', getSettings);
router.put('/settings', validateToken, adminVerification, updateSettings);
router.patch('/toggle', validateToken, adminVerification, toggleActive);

export default router;
