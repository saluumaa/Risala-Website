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
   const id = req.params.id

   try{
      const newsChange = await Post.findById(id)
      res.status(200).json(newsChange)
   }catch(error){
       res.status(404).json({message: error.message})
   }
}

export const createNews = async (req, res) => {
    const { title, body, date, place, target } = req.body;
    const images = req.files.map((file) => file.path);
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
    const id = req.params.id;
    const tokenUserId = req.user.id;
    const { title, body, images, date, place, target } = req.body;
    try{
        const updatedNews = await Post.findByIdAndUpdate(id, {
            title,
            body,
            images,
            date,
            place,
            target
        }, {new: true});
        res.status(200).json(updatedNews);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
    
}

export const deleteNews= async (req, res) => {
    const id = req.params.id
    try{   
    const deleteNews = await Post.findByIdAndDelete(id)
    res.status(200).json(deleteNews)
    }catch(error){
        res.status(500).json({ message: error.message });
    }
    
}