const Sequelize = require('sequelize');

const dbConfig = require('../config/config'); 


const sequelize = new Sequelize(dbConfig.database.database, dbConfig.database.user, dbConfig.database.password, {
  host: dbConfig.database.host,
  port: dbConfig.database.port,
  dialect: 'mysql', 
  dialectOptions: {
    multipleStatements: true, 
  },
  define: {
    timestamps: false, 
  },
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


module.exports = sequelize;
