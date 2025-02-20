import Chat from '../models/Chat.js';
import Message from '../models/Message.js';
import mongoose from 'mongoose';

export const addMessage = async (req, res) => {
    const tokenUserId = req.user.id;  
    const { chatId } = req.params;    // Get chatId from request params
    const { text } = req.body;

    try {
        // Validate chatId
        if (!mongoose.Types.ObjectId.isValid(chatId)) {
            return res.status(400).json({ message: "Invalid chat ID" });
        }

        // Find the chat that the user is part of
        const chat = await Chat.findOne({
            _id: chatId,
            users: {
                $in: [tokenUserId],
            }
        });

        if (!chat) {
            return res.status(404).json({ message: "You are not part of this chat" });
        }

        // Create a new message
        const newMessage = new Message({
            text,
            userId: tokenUserId,
            chatId,
        });

        await newMessage.save();

        // Add the message to the chat
        chat.messages.push(newMessage._id);
        chat.seenBy = [tokenUserId];  // Reset seenBy to the sender
        await chat.save();

        console.log('userId:', tokenUserId);
        console.log('chatId:', chatId);

        res.status(200).json(newMessage);
    } catch (error) {
        console.error('Error adding message:', error);
        res.status(500).json({ message: "Failed to add message" });
    }
};
