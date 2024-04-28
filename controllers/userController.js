const {userModel} = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/Token');


const Login =async(req,res)=>{
    try{
        const {username,password} = req.body;
        if(!username || !password){
            return res.status(400).json({error:true,message:'enter all fields'})
        }
        const user = await userModel.findOne({username:username})
        if(!user){
            return res.status(400).json({error:true,message:'User does not exist'});
        }
        const checkPassword = await bcrypt.compare(password,user.password);
        if(!checkPassword){
            return res.status(400).json({error:true,message:'Invalid password'})
        }
        const token = generateToken(user.email,user.role)
        if(token==""){
            return res.status(400).json({error:true,message:'Token generation failed'})
        }
        return res.status(200).json({error:false,message:{token:token}})
  }catch(err){
    console.log(err.message)
    return res.status(400).json({error:true , message:err.message})
  }
}

const Signup = async(req,res)=>{
    try{
        const {username,email,password,role,userPhone} = req.body;
        if(!username||!email||!password){
            return res.status(400).json({error:true,message:'enter all the details'});
        }
        const user = await userModel.findOne({username});
        if(user){
            return res.status(400).json({error:true,message:'User already exists'});
        }
        const hashpassword = await bcrypt.hash(password,10);
        try{
            const doc = await userModel.create({
                username:username,
                email:email,
                password:hashpassword,
                role:role,
                userPhone:userPhone
            })
            return res.status(200).json({error:false,message:'User created successfully'})
        }catch(err){
            console.log(err.message)
            return res.status(500).json({error:true,message:'User creation failed'});
        }
    }catch(err){
        console.log(err.message)
        return res.status(400).json({error:true,message:'Signup failed'})
    }
}

const getUser= async(req,res)=>{
    if(!req.user){
        return res.status(400).json({error:true,message:'User not found'})
    }
   try{
     return res.status(200).json({error:false,message:{username: req.user.username,email:req.user.email,role:req.user.role}})
   }catch(err){
    console.log(err.message)
    res.status(400).json({error:true,message:err.message})
   }
}
module.exports = {Login,Signup,getUser}
