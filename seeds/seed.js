const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    const blogs = await Blog.bulkCreate(blogData);

console.log(users)
console.log(blogs)

    console.log('Database seeded successfully!');
  } catch (err) {
    console.log('Error seeding database:', err);
  } finally {
    process.exit(0);
  }
};

seedDatabase();
