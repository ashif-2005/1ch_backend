const mongodb = require('mongoose')

const schema = mongodb.Schema({
    agentId:{
        type:Number
    },
    agentMail:{
        type:Number
    },
    toCall:{
        type:Array
    }
})

const agentModel = mongodb.model("agent",schema)
module.exports = {agentModel};