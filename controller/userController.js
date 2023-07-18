const db = require('../shared/db');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const loginUser = async(req,res)=>{
    const{email,password} = req.body;
    console.log(email);
    const user= await db.users.findOne({
        where: {
        email: email
      }});
      console.log(user);
    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
                const token = jwt.sign(
                    {email:email},
                    process.env.TOKEN_KEY,
                    {
                    expiresIn: "2h",
                    }

                );
                user.token=token;
                
                res.header("x-access-token",token).status(200).send(user);
          }
        else{
                
                console.log("failure");
        }
      })
}

const registerUser =async(req,res)=>{
   try{
    console.log(req.body)
    const { name, email, password } = req.body;
    const oldUser = await db.users.findOne({ where: { email: email } });
    if (oldUser) {
        return res.send("User Already Exist. Please Login");
      }
    const salt=await bcrypt.genSalt(10);
    encryptedPassword =await bcrypt.hash(password,salt);
    const user = await db.users.create({
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        isAdmin:true
      });
      res.status(201).json(user);
   }
   catch(e){
    console.log(e)
   }
}

module.exports = {loginUser,registerUser};