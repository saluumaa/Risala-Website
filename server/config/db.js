import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URI) {
  console.error('❌ DATABASE_URI is not defined in .env file');
  console.error('Please create a .env file with DATABASE_URI in the format:');
  console.error('DATABASE_URI=postgres://username:password@localhost:5432/database_name');
  process.exit(1);
}

const sequelize = new Sequelize(process.env.DATABASE_URI, {
  dialect: 'postgres',
  logging: false, // Set to console.log to see SQL queries
});

export default sequelize;
