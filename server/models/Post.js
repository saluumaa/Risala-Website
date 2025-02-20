import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
        // required: true,
    }, 
    date: {
        type: Date,
        required: true,
    }, 
    place: {
        type: String,
        default: 'Risala-place',
    },
    target: {
        type: String,
        default: 'All',
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },


}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
export default Post;