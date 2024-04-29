const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema(
    {
        contactName:{
            type:String,
            required:true
        },
        contactMail:{
            type:String,
        },
        contactPhone:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        },
        agentName:{
            type:String,
            required:true
        },
        dateAssigned :{
            type:Date,
            default:Date.now
        },
        assigned : {
            type:String,
            enum:['assigned','unassigned','completed'],
            default:'unassigned'
        }
    },
    {
        timestamps:true
    }
)

const contactModel = mongoose.model('contact',contactSchema)
module.exports={contactModel};
