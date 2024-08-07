import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';

dotenv.config();

const app = express();
app.use(express.json());
mongoose.connect(process.env.Database_URL)

// app.use(cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
// }));
app.use(cookieParser());
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);


app.listen(8800, () => {
    console.log('Server is running on http://localhost:8800');
});