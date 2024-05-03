require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sequelizeDemo', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;