const router = require('express').Router();
const getUser = require('../middlewares/auth')
const { voiceResponse,tokenGenerator } = require('../controllers/twilioController');

router.get("/token", (req, res) => {
    const data = tokenGenerator()
    if(!data){
        console.log(data)
        return res.status(400).json({error:true,message:'failed generating token'})  
    }
    return res.status(200).json({error:false,message:data})
});
  

router.post("/voice", (req, res) => {
    const data = voiceResponse(req.body)
    if(!data){
        return res.status(400).json({error:true,message:'failed receiving voice'})  
    }
    res.set("Content-Type", "text/xml");
    return res.status(200).json({error:false,message:data});
});


module.exports = router;