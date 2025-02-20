import mongoose from 'mongoose';
import Chat from '../models/Chat.js';
import User from '../models/User.js';


// Get all chats for the authenticated user (including chats with admin)


export const getChats = async (req, res) => {
    const tokenUserId = req.user.id; // The authenticated user ID
    
    try {
        // Find all chats where the authenticated user is a participant
        const chats = await Chat.find({
            users: { $in: [tokenUserId] }, // Find chats where the user is one of the participants
        }) // Populate user details

        // Fetch admin user details
        const adminUser = await User.findOne({ role: 'admin' }, '_id username');
        
        // If no admin user is found, handle the error
        if (!adminUser) {
            return res.status(404).json({ message: "Admin user not found" });
        }

        // Attach the admin user as the receiver to each chat
        const chatsWithReceiver = chats.map(chat => {
            // Find the other user in the chat (the receiver)
            const receiver = chat.users.find(user => user._id.toString() !== tokenUserId);
            
            // Attach the admin as receiver if the chat has the other user
            return {
                ...chat.toObject(), // Convert Mongoose document to plain object
                receiver: receiver ? adminUser : null, // Attach admin as receiver if applicable
            };
        });

    //    console.log('Chats with receiver:', chatsWithReceiver);
        res.status(200).json(chatsWithReceiver);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get chats" });
    }
};





export const getChat = async (req, res) => {
    const chatId = req.params.id;
    console.log('Chat ID from request params:', chatId);

    // Validate chatId
    if (!chatId || !mongoose.Types.ObjectId.isValid(chatId)) {
        return res.status(400).json({ message: 'Invalid Chat ID' });
    }

    try {
        // Find the chat by ID and ensure the authenticated user is one of the participants
        const chat = await Chat.findOne({ 
            _id: chatId,
            users: { $in: [req.user.id] }
        })
        .populate('messages', 'text createdAt')
        .populate('users', 'username');

        // Check if the chat exists
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        // Update the `seenBy` field to include the current user
        if (!chat.seenBy.includes(req.user.id)) {
            await chat.updateOne({ 
                $push: { seenBy: req.user.id }
            });
        }

        // Send the chat details in the response
        res.status(200).json(chat);
    } catch (error) {
        console.error('Error fetching chat:', error);
        res.status(500).json({ message: 'Failed to get chat' });
    }
};

  

export const addChat = async (req, res) => {
    const tokenUserId = req.user.id; // Ensure the tokenUserId is correct (retrieved from logged-in user)

    try {
        // Fetch the admin (assuming there's only one admin)
        const admin = await User.findOne({ role: 'admin' });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Ensure the logged-in user is not the admin (prevents self-chat)
        if (tokenUserId === admin._id.toString()) {
            return res.status(400).json({ message: "You cannot start a chat with yourself (admin)." });
        }

        // Check if chat already exists between user and admin
        let chat = await Chat.findOne({
            users: { $all: [tokenUserId, admin._id] },
        });

        // If chat doesn't exist, create a new one
        if (!chat) {
            chat = new Chat({
                users: [tokenUserId, admin._id], 
            });
           
            await chat.save();
        }

        console.log('Chat ID in server:', chat._id);

        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to add chat" });
    }
};


// Mark a chat as read by the authenticated user
export const readChat = async (req, res) => {
    const tokenUserId = req.user.id;
    const chatId = req.params.id;

    try {
        const chat = await Chat.findOne({
            _id: chatId,
            users: tokenUserId,
        });

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found or you are not part of this chat' });
        }

        // Mark chat as read by the user
        if (!chat.seenBy.includes(tokenUserId)) {
            chat.seenBy.push(tokenUserId);
            await chat.save();
        }

        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to mark chat as read" });
    }
};
