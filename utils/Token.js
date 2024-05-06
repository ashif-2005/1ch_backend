const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config('./env')
const secret = process.env.SECRET;

const generateToken = (id,name,role,phone)=>{
    try{
        const token = jwt.sign(
            {id,name,role,phone},
             secret,
            {expiresIn:'7d'}
        )
        return token;
    }catch(err){
        console.error(err.message)
        return "";
    }
}
module.exports={generateToken}
