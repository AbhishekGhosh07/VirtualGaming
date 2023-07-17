const db = require('../shared/db')

const addUser =async(req,res)=>{
    let users=await db.users.findAll({})

    res.send(users)

}


module.exports = {addUser};