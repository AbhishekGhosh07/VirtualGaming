const express = require('express');
const route = express.Router();
const auth = require('../middleware/auth')
route.get('/welcome',auth,(req,res)=>{
    res.send("WELCOME");
})

module.exports=route;