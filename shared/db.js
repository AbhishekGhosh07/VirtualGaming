const dbConfig = require('./config/db');
const { Sequelize, DataTypes } = require('sequelize');



const sequelize = new Sequelize(

    dbConfig.database,

    dbConfig.username,

    dbConfig.password, {

    host: dbConfig.host,

    dialect: dbConfig.dialect,

    operatorsAliases: false,



    pool: {

        max: 5,

        min: 0,

        acquire: 30000,

        idle: 10000



    }

}

)



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


// const connect =async ()=>{
//     await sequelize.authenticate();
//     return true;
// }
// const disconnect = async ()=>{
//     await sequelize.close();
//     return true;
// }
module.exports = db

