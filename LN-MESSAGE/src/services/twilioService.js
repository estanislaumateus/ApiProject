exports.sendSMS = async (to, message) => {
  if (process.env.USE_MOCK === "true") {
    return {
      sid: "MOCK_" + Date.now(),
      status: "sent (mock)",
      to,
      message
    };
  }

  // código real da Twilio
  const twilio = require("twilio");
  const client = twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH
  );

  return await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE,
    to
  });
};