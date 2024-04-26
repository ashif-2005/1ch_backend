const {agentSchema} = require('../models/agentModel');
const {callSchema} = require('../models/callModel');

const jwt = require('jsonwebtoken')

const callLogs = async(req,res)=>{
try{
   const agent = jwt.decode(req.header.authorization.split(' ')[1].split('=')[1])
   const id = agent.id;
   const calls = await callModel.findOne({agent_id:id})
   return res.status(200).json({error:false,calls:calls});
 }catch(err){
    console.log(err.message)
    return res.status(400).json({error:true,message:err.message})
}
}

