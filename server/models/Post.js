import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    place: {
        type: DataTypes.STRING,
        defaultValue: 'Risala-place',
    },
    target: {
        type: DataTypes.STRING,
        defaultValue: 'All',
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Note: Sequelize pluralizes table names by default
            key: 'id',
        },
    },
}, {
    timestamps: true,
});

export default Post;