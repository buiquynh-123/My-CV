import twilio from "twilio";

const accountSid = "your_account_sid";
const authToken = "your_auth_token";

const client = twilio(accountSid, authToken);

function sendWhatsAppMessage(to, message) {
  client.messages
    .create({
      body: message,
      from: "whatsapp:+14155238886", // Số điện thoại được cấp bởi Twilio
      to: `whatsapp:${to}`, // Số điện thoại khách hàng
    })
    .then((message) => console.log(message.sid));
}
