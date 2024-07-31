import express from 'express';
import { deleteNews, getnews, getSingleNews, updateNews, createNews } from '../controllers/news.controller.js';
import {validateToken} from '../utils/validateToken.js';
import {adminVerification} from '../utils/adminVerification.js';
import multer from 'multer';
import path from 'path';


const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/', getnews);
router.get('/:id', getSingleNews);
router.post('/', upload.array('images', 10), validateToken, adminVerification, createNews);
router.put('/:id', validateToken, adminVerification, updateNews);
router.delete('/:id',validateToken, adminVerification, deleteNews);

export default router;