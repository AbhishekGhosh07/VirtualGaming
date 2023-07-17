require('dotenv').config();

const express = require('express');

const login = require('./routes/login')
const app = express();
const port = process.env.PORT;
app.use('/',login);
app.listen(port,()=>{
    console.log(`server is running on ${port}and bye`);
})