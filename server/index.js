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

dotenv.config();

const app = express();

// 🔹 Required for Render / proxies
app.set('trust proxy', 1);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ======================
// Middleware
// ======================

// i18n
app.use(i18nMiddleware);

// Security
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Body parser
app.use(express.json());

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(cookieParser());

// ======================
// Database Connection (Sequelize)
// ======================
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await sequelize.sync({ alter: true });
    console.log('✅ Database synced');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
})();

// ======================
// Routes
// ======================

app.get('/', (req, res) => {
  res.send('Hello to Risala API');
});

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/news', newsRoute);
app.use('/api/syp', sypRoute);
app.use('/api/programme', programmeRoute);
app.use('/api/reports', reportRoute);

// ======================
// Server
// ======================

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
