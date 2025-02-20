// import express from 'express';
// import { sendMessage, getMessages } from '../controllers/message.controller.js';
// import {validateToken} from '../utils/validateToken.js';
// // import {adminVerification} from '../utils/adminVerification.js';
// const router = express.Router();


// // router.get("/", validateToken,fetchAllChats);
// router.get('/:chatId', validateToken, getMessages);
// router.post('/send', validateToken, sendMessage);
// // router.post('/recieve',validateToken, adminVerification, respondToMessage);


// export default router;

import express from 'express';
import { addMessage } from '../controllers/message.controller.js';
import { validateToken } from '../utils/validateToken.js';

const router = express.Router();

router.post("/:chatId", validateToken, addMessage);  // Send a message in a specific chat

export default router;
