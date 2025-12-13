import sequelize from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

console.log('DATABASE_URI defined:', !!process.env.DATABASE_URI);

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();
