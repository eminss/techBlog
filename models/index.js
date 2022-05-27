const Blog = require('./Blog');
const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Blog);
Blog.belongsTo(User);
Comment.belongsTo(Blog);
Blog.hasMany(Comment);

module.exports = {
    Blog,
    User,
    Comment
};
