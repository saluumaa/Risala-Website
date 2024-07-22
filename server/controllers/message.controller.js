import Message from '../models/Message.js';
import User from '../models/User.js';

// Send a message from user to admin
export const sendMessage = async (req, res) => {
    const { recipientId, text } = req.body;
    const senderId = req.user.id;

    try {

        const recipient = await User.findById(recipientId);
        if (!recipient || recipient.role !== 'admin') {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Create and save the message
        const newMessage = new Message({
            chatId: recipientId, 
            sender: senderId,
            recipient: recipientId,
            text,
        });

        const savedMessage = await newMessage.save();
        console.log(savedMessage);
        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin responds to a message
export const respondMessage = async (req, res) => {
    const { chatId, text } = req.body;
    const senderId = req.user.id; // Admin's ID

    try {
        const recipient = await User.findById(chatId); // User who sent the original message

        if (!recipient) {
            return res.status(404).json({ message: 'User not found' });
        }

        const responseMessage = new Message({
            chatId,
            sender: senderId,
            recipient: chatId,
            text,
        });

        const savedResponse = await responseMessage.save();

        res.status(201).json(savedResponse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch all messages for the admin
export const fetchAllMessages = async (req, res) => {
    try {
        const messages = await Message.find({ recipient: req.user.id }).populate('sender', 'username email');

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch a specific conversation by chatId for a user
export const fetchMessageById = async (req, res) => {
    const chatId = req.params.id;
    const userId = req.user.id;

    try {
        const messages = await Message.find({
            chatId,
            $or: [{ sender: userId }, { recipient: userId }]
        }).populate('sender recipient', 'username email');

        if (messages.length === 0) {
            return res.status(404).json({ message: 'No messages found for this chat' });
        }

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
