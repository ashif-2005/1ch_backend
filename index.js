const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const agentRoutes = require('./routes/agentRoutes')
const twilioRouters = require('./routes/twilioRoutes')
const app = express()

const {userModel} = require('./models/userSchema')
const {contactModel} = require('./models/contactSchema')

app.use(express.json())
app.use(bodyParser.json())
app.use(cors());

app.use('/',twilioRouters)
app.use('/users',userRoutes)
app.use('/agent',agentRoutes)

app.get('/getEmp',async (req,res)=>{
    try{
        const user = await userModel.find();
        res.status(200).json(user)
    }catch(error){
        res.status(401).json({"status":"error","error":error})
    }
})

app.get('/getContact',async (req,res)=>{
    try{
        const user = await contactModel.find();
        res.status(200).json(user)
    }catch(error){
        res.status(401).json({"status":"error","error":error})
    }
})

app.post('/store',async (req,res)=>{
    try{
        await contactModel.create({
            "contactName":req.body.name,
            "contactMail":req.body.email,
            "contactPhone":req.body.number,
            "agentName":req.body.agent,
            "status":"pending"
        })
        res.status(200).json({
            "status":"Success fully added to database"
        })
    }catch(error){
        res.status(401).json({'status':'error','error':error})
    }
})

app.listen(8000, () => {
    console.log('Server is running on port 8000')
})

dotenv.config('./env')

try{
    const connect = async()=>{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Database connected')
    }
    connect();
}catch(err){
    console.log(err.message)
}
