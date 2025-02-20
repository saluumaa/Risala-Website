import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import newsRoute from './routes/news.route.js';
import messageRoute from './routes/message.route.js';
import sypRoute from './routes/sProgramme.route.js';
import chatRoute from './routes/chat.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();

const app = express();
app.use(express.json());
mongoose.connect(process.env.Database_URL)

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('Hello to SYP API');
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/news', newsRoute);
app.use('/api/messages', messageRoute);
app.use('/api/chats', chatRoute);
app.use('/api/syp', sypRoute);


app.listen(8800, () => {
    console.log('Server is running on http://localhost:8800');
});