import express from 'express';
import { validateToken } from '../utils/validateToken.js';
import { getSYP, getSYPs, createSYP, updateSYP, deleteSYP } from '../controllers/sProgramme.controller.js';
const router = express.Router();

router.get('/', validateToken, getSYPs);
router.get('/:id', validateToken, getSYP);
router.post('/', createSYP);
router.put('/:id', validateToken, updateSYP);
router.delete('/:id', validateToken, deleteSYP);

export default router;