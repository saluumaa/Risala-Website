import express from 'express';
import { validateToken } from '../utils/validateToken.js';
import { adminVerification } from '../utils/adminVerification.js';
import { getReports, createReport, deleteReport } from '../controllers/report.controller.js';

const router = express.Router();

router.get('/', validateToken, adminVerification, getReports);
router.post('/', validateToken, adminVerification, createReport);
router.delete('/:id', validateToken, adminVerification, deleteReport);

export default router;
