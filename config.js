
const dotenv = require('dotenv')
dotenv.config('./env')

const cfg = {};
// if (process.env.NODE_ENV !== "test") {
  
// } 

// HTTP Port to run our web application
cfg.port = process.env.PORT || 5000;

// Your Twilio account SID and auth token, both found at:
// https://www.twilio.com/user/account
//
// A good practice is to store these string values as system environment
// variables, and load them from there as we are doing below. Alternately,
// you could hard code these values here as strings.
cfg.accountSid = process.env.TWILIO_ACCOUNT_SID;

cfg.twimlAppSid = process.env.TWIML_APP_SID;
cfg.callerId = process.env.TWILIO_NUMBER;

cfg.apiKey = process.env.TWILIO_API_KEY_SID;
cfg.apiSecret = process.env.TWILIO_API_KEY_SECRET;
console.log(cfg.accountSid)
// Export configuration object
module.exports = cfg;