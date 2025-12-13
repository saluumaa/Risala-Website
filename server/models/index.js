import User from './User.js';
import Post from './Post.js';
import SProgramme from './SProgramme.js';

import Programme from './Programme.js';
import Report from './Report.js';

// User - Post Association
User.hasMany(Post, { foreignKey: 'authorId' });
Post.belongsTo(User, { foreignKey: 'authorId' });

// User - SProgramme Association
User.hasMany(SProgramme, { foreignKey: 'authorId' });
SProgramme.belongsTo(User, { foreignKey: 'authorId' });

// User - Report Association
User.hasMany(Report, { foreignKey: 'authorId' });
Report.belongsTo(User, { foreignKey: 'authorId' });

export { User, Post, SProgramme, Programme, Report };
