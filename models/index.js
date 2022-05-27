const Blog = require('./Blog');
const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Blog);
User.hasMany(Comment);
Blog.belongsTo(User);
Comment.belongsTo(User);
Comment.belongsTo(Blog);
Blog.hasMany(Comment);



module.exports = {
    Blog,
    User,
    Comment
};
