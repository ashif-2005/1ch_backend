const mongodb = require('mongoose')

const schema = new mongodb.Schema({
    call_id:{
        type:Number,
        required:true
    },
    agent_id:{
        type:Number,
        required:true
    },
    phone_number:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    time:{
        type:String
    },
    duration:{
        type:String
    },
    topic:{
        type:String
    },
    status:{
        type:String,
        enum:['answered','rejected','busy','unavailable'],
    },
    rec_name:{
        type:String
    }
})

const callModel = mongodb.model("callLog",schema)
module.exports = {callModel};