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


module.exports = {addUser};