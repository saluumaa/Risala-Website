
import User from "../models/User.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        const{password:userPassword, ...userInfo} = newUser._doc;
        // console.log("New user created:", newUser);
        res.status(201).json({ userInfo });
    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).json({ message: "Failed to register user" });
    }
};


export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const comparePassword = await bcryptjs.compare(password, user.password);
        if(!comparePassword){
            return res.status(400).json({message: "Incorrect password"});
        }
        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1d'});
        const {password:userPassword, ...userInfo} = user._doc;
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        }).status(200).json(userInfo);
    }catch(err){
        console.error("Error in login:", err);
        res.status(500).json({message: "Failed to login"});
    
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token').status(200).json({message: "Logged out"});
    } catch (error) {
        console.error("Error in logout:", error);
        res.status(500).json({message: "Failed to logout"});
    }
}