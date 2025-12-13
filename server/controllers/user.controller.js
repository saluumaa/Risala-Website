import { User } from "../models/index.js";
import bcryptjs from "bcryptjs";

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const tokenUserId = req.user.id;
    const { password, ...inputs } = req.body;
    if (tokenUserId !== id) {
        return res.status(403).send({ message: "You can only update your account" });
    }
    let updatedPassword;
    try {
        if (password) {
            updatedPassword = await bcryptjs.hash(password, 10);
        }
        const [updated] = await User.update({
            ...inputs,
            ...(updatedPassword && { password: updatedPassword })
        }, {
            where: { id },
            returning: true
        });

        if (updated) {
            const updatedUser = await User.findByPk(id);
            const { password: userPassword, ...others } = updatedUser.toJSON();
            res.send(others);
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    // Check if tokenUserId is available, if not try req.user.id
    const currentUserId = req.user ? req.user.id : null;

    // Allow if user is deleting themselves OR if user is admin
    if (currentUserId !== id && req.user.role !== 'admin') {
        return res.status(403).send({ message: "You can only delete your account or must be an admin" });
    }
    try {
        const deleted = await User.destroy({ where: { id } });
        if (deleted) {
            res.send({ message: "User deleted" });
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
