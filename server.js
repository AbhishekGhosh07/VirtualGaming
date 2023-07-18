require('dotenv').config();

const express = require('express');

const login = require('./routes/login')
const register = require('./routes/register')
const app = express();

const port = process.env.PORT;
app.use(express.json())
app.use('/',login);
app.use('/',register);
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})