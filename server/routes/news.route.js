import express from 'express';
import { deleteNews, getnews, getSingleNews, updateNews, createNews } from '../controllers/news.controller.js';
import {validateToken} from '../utils/validateToken.js';
import {adminVerification} from '../utils/adminVerification.js';
const router = express.Router();

router.get('/', getnews);
router.get('/:id', getSingleNews);
router.post('/', validateToken, adminVerification, createNews);
router.put('/:id', validateToken, adminVerification, updateNews);
router.delete('/:id',validateToken, adminVerification, deleteNews);

export default router;