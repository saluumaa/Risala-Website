import express from 'express';
import { validateToken } from '../utils/validateToken.js';
// import {adminVerification} from '../utils/adminVerification.js';
import { getSYP, getSYPs, createSYP, updateSYP, deleteSYP } from '../controllers/sProgramme.controller.js';
const router = express.Router();

router.get('/', getSYPs);
router.get('/:id', getSYP);
router.post('/', validateToken, createSYP);
router.put('/:id', validateToken, updateSYP);
router.delete('/:id', validateToken, deleteSYP);

export default router;