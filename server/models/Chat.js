import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }],

    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    seenBy : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
  
}, { timestamps: true });


const Chat = mongoose.model('Chat', ChatSchema);
export default Chat;
