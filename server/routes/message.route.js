import express from 'express';
import { sendMessage, respondMessage, fetchAllMessages, fetchMessageById } from '../controllers/message.controller.js';
import {validateToken} from '../utils/validateToken.js';
import {adminVerification} from '../utils/adminVerification.js';
const router = express.Router();


router.get("/", validateToken,fetchAllMessages);
router.get('/:id', validateToken, adminVerification, fetchMessageById);
router.post('/send', validateToken, sendMessage);
router.post('/recieve',validateToken, adminVerification, respondMessage);


export default router;