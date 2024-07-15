import User from "../models/User.js";
import bcryptjs from "bcryptjs";

export const getUsers= async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const getUser= async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const updateUser= async (req, res) => {
    const id = req.params.id;
    const { username, email, password } = req.body;
    const passwordHash = await bcryptjs.hash(password, 10);
    try{
        const user = await User.findByIdAndUpdate(id, {
            username,
            email,
            password: passwordHash,
        });
        res.send(user);
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

export const deleteUser= async (req, res) => {
    const id = req.params.id;
    try{
        const deleteUser = await User.findByIdAndDelete(id);
        res.send(deleteUser);
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}