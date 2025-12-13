import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Programme = sequelize.define('Programme', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Summer Youth Programme',
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    registrationDeadline: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    fee: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    activities: {
        type: DataTypes.JSON, // Store array of strings
        allowNull: true,
    },
    requirements: {
        type: DataTypes.JSON, // Store array of strings
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: true,
});

export default Programme;
