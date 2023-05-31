const User = require('./User');
const Blog = require('./Blog');

User.hasMany(Blog,{
foreignKey: 'user_id',
onDelete: 'CASCADE'
});
//blog belongs to users, one too many relationships
Blog.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Blog };