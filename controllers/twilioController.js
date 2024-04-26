const name_generator = require("../utils/name_generator");

const VoiceResponse = require("twilio").twiml.VoiceResponse;
const AccessToken = require("twilio").jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

var identity;
const config = require('../config')

exports.tokenGenerator = function tokenGenerator() {
  console.log("tokengenerator")
  identity = name_generator()
  console.log(identity)
//   console.log(config.accountSid)
  const accessToken = new AccessToken(
   process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY_SID,
   process.env.TWILIO_API_KEY_SECRET
  );
  accessToken.identity = identity;
  const grant = new VoiceGrant({
    outgoingApplicationSid:process.env.TWIML_APP_SID,
    incomingAllow: true,
  });
  accessToken.addGrant(grant);
  console.log(accessToken.toJwt())
  return {
    identity: identity,
    token: accessToken.toJwt(),
  };
};

exports.voiceResponse = function voiceResponse(requestBody) {
  const toNumberOrClientName = requestBody.To;
  const callerId = process.env.TWILIO_NUMBER;
  let twiml = new VoiceResponse();

  // If the request to the /voice endpoint is TO your Twilio Number, 
  // then it is an incoming call towards your Twilio.Device.
  if (toNumberOrClientName == callerId) {
    let dial = twiml.dial();

    // This will connect the caller with your Twilio.Device/client 
    dial.client(identity);

  } else if (requestBody.To) {
    // This is an outgoing call

    // set the callerId
    let dial = twiml.dial({ callerId });
    const attr = isAValidPhoneNumber(toNumberOrClientName)
      ? "number"
      : "client";
    dial[attr]({}, toNumberOrClientName);
  } else {
    twiml.say("Thanks for calling!");
  }

  return twiml.toString();
};


function isAValidPhoneNumber(number) {
  return /^[\d\+\-\(\) ]+$/.test(number);
}
