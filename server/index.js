import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';

const app = express();
app.use(express.json());
dotenv.config();

app.use(cookieParser());
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.listen(8800, () => {
    console.log('Server is running on http://localhost:8800');
});