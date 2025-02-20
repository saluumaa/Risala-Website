// import express from 'express';
// import { createChat, getUserChats } from '../controllers/chat.controller.js';
// // import { verifyToken } from '../middleware/verifyToken.js';
// import { validateToken } from '../utils/validateToken.js';

// const router = express.Router();

// router.get("/",validateToken, getUserChats);
// // router.get("/:id",validateToken, getChat);
// router.post("/",validateToken, createChat);




// export default router;

import express from 'express';
import { getChats, getChat, addChat, readChat } from '../controllers/chat.controller.js';
import { validateToken } from '../utils/validateToken.js';

const router = express.Router();

router.get("/", validateToken, getChats);  // Get all chats
router.get("/:id", validateToken, getChat);  // Get a specific chat by chatId
router.post("/", validateToken, addChat);  // Start a new chat with the admin
router.put("/read/:id", validateToken, readChat);  // Mark chat as read

export default router;
