const dbConfig = require('./config/db');

require('dotenv').config();
const {DB_USER,DB_PASS,DB_HOST,DB_SCHEMA} = process.env;
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.development.database,
    dbConfig.development.username,
    dbConfig.development.password,
    {
        host: dbConfig.development.host,
        dialect: dbConfig.development.dialect,
        operationsAliases: false,
        pool: {
            max:5,
            min:0,
            acquire:30000,
            idle:10000
        }
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('connected..')
    })

    .catch(err => {
        console.log('Error' + err)
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.users = require('../models/userModel')(sequelize, DataTypes)
db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })

module.exports = db

