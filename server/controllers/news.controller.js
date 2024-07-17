import jwt from 'jsonwebtoken';
import Post from '../models/Post.js';



export const getnews= async (req, res) => {
    try{
        const news = await Post.find();
        res.status(200).json(news);
    }catch(error){
        res.status(404).json({message: error.message})
    }
    
}

export const getSingleNews= async (req, res) => {
   
}

export const createNews = async (req, res) => {
    // const tokenUserId = req.userId;
    const { title, body, images, date, place, target } = req.body;
    try {
        const addPost = await Post.create({
            title,
            body,
            images,
            date,
            place,
            target,
            author: req.user.id
        });
        res.status(201).json(addPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateNews= async (req, res) => {
    
}

export const deleteNews= async (req, res) => {
    
}