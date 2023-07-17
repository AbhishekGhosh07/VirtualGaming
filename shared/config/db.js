require('dotenv').config();

const {DB_USER,DB_PASS,DB_HOST,DB_SCHEMA,DB_PORT} = process.env;

const DIALECT = "mysql"

const dbConfig ={
    username:DB_USER,
    password:DB_PASS,
    host:DB_HOST,
    database:DB_SCHEMA,
    port:DB_PORT,
    dialect : DIALECT
}

module.exports={
development:dbConfig
}