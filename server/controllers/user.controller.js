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
    const tokenUserId = req.user.id;
   const {password, ...inputs} = req.body;
    if(tokenUserId !== id){
        return res.status(403).send({message: "You can only update your account"});
    }
    let updatedPassword;
    try{
        if(password){
            updatedPassword = await bcryptjs.hash(password, 10);
        }
        const user = await User.findByIdAndUpdate(id, {
            ...inputs,
            password: updatedPassword
        }, {new: true
        });
        const {password:userPassword, ...others} = user._doc;
        res.send(others);
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

export const deleteUser= async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    if(tokenUserId !== id){
        return res.status(403).send({message: "You can only delete your account"});
    }
    try{
        const deleteUser = await User.findByIdAndDelete(id);
        res.send(deleteUser);
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}