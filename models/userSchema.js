const mongoose = require('mongoose')

const userSchema =new mongoose.Schema(
    {
       username:{
        type:String,
        required:true,
        unique:true
       },

       email:{
        type:String,
        required:true,
        unique:true
       },

       password:{
        type:String,
        required:true
       },

       userid:{
        type:String,    
       },

       role:{
        type:String,
        enum: ['anonymous','admin', 'agent'], 
        default:'anonymous'
       },

       isBan:{
        type:Boolean,
        default:false
       }
    },
    {
        timestamps:true
    }
)

const userModel = mongoose.model('user',userSchema)
module.exports={userModel}

