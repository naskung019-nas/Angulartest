// sequelize.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('support_schedule2', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port:'3306' // or 'postgres', 'sqlite', etc.
});

module.exports = sequelize;
