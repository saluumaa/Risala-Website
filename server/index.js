import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';

import sequelize from './config/db.js';
import i18next, { i18nMiddleware } from './config/i18n.js';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import newsRoute from './routes/news.route.js';
import sypRoute from './routes/sProgramme.route.js';
import programmeRoute from './routes/programme.route.js';
import reportRoute from './routes/report.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// i18n Middleware
app.use(i18nMiddleware);

// Security Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use(xss());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json());

// Database Connection
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database connected and synced');
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
    });

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello to Risala API');
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/news', newsRoute);
app.use('/api/syp', sypRoute);
app.use('/api/programme', programmeRoute);
app.use('/api/reports', reportRoute);

app.listen(8800, () => {
    console.log('Server is running on http://localhost:8800');
});