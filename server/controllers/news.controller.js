import jwt from 'jsonwebtoken';
import { Post } from '../models/index.js';

export const getnews = async (req, res) => {
    try {
        const news = await Post.findAll();
        res.status(200).json(news);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

export const getSingleNews = async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const newsChange = await Post.findByPk(id)
        res.status(200).json(newsChange)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createNews = async (req, res) => {
    const { title, body, date, place, target } = req.body;
    const images = req.files ? req.files.map((file) => file.path) : [];
    try {
        const addPost = await Post.create({
            title,
            body,
            images,
            date,
            place,
            target,
            authorId: req.user.id
        });
        console.log(addPost);
        res.status(201).json(addPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const updateNews = async (req, res) => {
    const id = parseInt(req.params.id);
    const tokenUserId = req.user.id;
    const { title, body, images, date, place, target } = req.body;
    try {
        const [updated] = await Post.update({
            title,
            body,
            images,
            date,
            place,
            target
        }, {
            where: { id },
            returning: true
        });

        if (updated) {
            const updatedNews = await Post.findByPk(id);
            res.status(200).json(updatedNews);
        } else {
            res.status(404).json({ message: "News not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const deleteNews = async (req, res) => {
    const id = req.params.id
    try {
        const deleteNews = await Post.destroy({ where: { id } })
        res.status(200).json(deleteNews)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}