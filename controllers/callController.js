const {callSchema} = require('../models/callModel');
const twilio = require('twilio');
const axios = require('axios');

const accountSid = 'AC179885a79b99fc0706b56cf810ed731e';
const authToken = 'b4da88ea76ba6451c5e771159fd8a2bf';

const getCalls = async(req,res)=>{
  try{
    const calls = await callModel.find({});
    console.log(calls)
    return res.status(200).json({error:false,calls:calls})
  }catch(err){
    console.log(err.message);
    return res.status(400).json({error:true,message:err.message})
  }
}

const initiateCall = (req,res)=>{
  try{
    async function makeCallAndRecord(from, to, twimlUrl) {
        try {
            // Make a POST request to initiate a call
            const response = await axios.post(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Calls.json`, 
                `From=${from}&To=${to}&Url=${twimlUrl}&Record=true`, {
                auth: {
                    username: accountSid,
                    password: authToken
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            // Check if the call was successfully initiated
            if (response.status === 201) {
                console.log("Call initiated successfully. SID:", response.data.sid);
                res.status(200).json({'status':'success','callSid':response.data.sid})
            } else {
                console.log("Failed to initiate call. Status code:", response.status);
                res.status(500).json({'status':'Some Internal Issue...','error':response.status})
            }
        } catch (error) {
            console.error("Error making call:", error);
        }
      }

      // Example usage: Replace placeholders with actual values
      const from = '+13343414014';
      const to = '+918667221581';
      const twimlUrl = 'https://calltrack.onrender.com/twiml/9629158412'; // URL to TwiML document that handles the call

      // Call the function to make a call and record it
      makeCallAndRecord(from, to, twimlUrl);

  }catch(error){
      res.status(400).json({'status':'error','error':error.message})
  }
}

const getLogs = async (req,res)=>{
  try {

    const response = await axios.get(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Calls.json`, {
        auth: {
            username: accountSid,
            password: authToken
        }
    });

    if (response.status === 200) {
        const callLogs = response.data;
        res.status(200).json({'data':callLogs.calls})
    } else {
        console.log("Failed to retrieve call logs. Status code:", response.status);
    }
  } catch (error) {
      console.error("Error retrieving call logs:", error);
  }
}