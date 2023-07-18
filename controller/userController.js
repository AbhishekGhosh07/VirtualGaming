const db = require('../shared/db')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const addUser =async(req,res)=>{
    const{email,password} = req.body;
    let user=await db.users.findOne({where: {
        email: email
      }})
    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
                console.log("success");
          }
        else{
                
                console.log("failure");
        }
      })

    res.send("OK");

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

module.exports = {addUser,registerUser};