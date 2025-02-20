const jwt = require('jsonwebtoken');
const { userModel } = require('../models/userSchema');

const checkUser = (req, res, next) => {
    try{
        const token_from_header= req.headers.authorization;
        if (!token_from_header) {
            return res.status(401).json({ error: true, message: 'token is required' });
        }
        const token = token_from_header.split(" ")[1]
        jwt.verify(token, process.env.SECRET, async (err, user) => {
            if (err) {
                return res.status(401).json({ error: true, message: 'invalid token' });
            }
            const doc = await userModel.findOne({ email: user.email });
            if(!doc){
                return res.status(400).json({error:true,message:'invalid user'});
            }
            req.user = {username: doc.username, email:doc.email, role:doc.role};
            next();
        })
    }
    catch(err){
        console.log(err.message)
        return res.status(400).json({error:true , message:err.message})
    }
}

module.exports =  checkUser