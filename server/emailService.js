const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

const sendEmail = async ({
  to,
  subject,
  htmlContent,
}) => {
  return await brevo.transactionalEmails.sendTransacEmail({
    sender: {
      name: "Voyage Travel Mansion",
      email: "561travelsandtours@gmail.com",
    },
    to: [
      {
        email: to,
      },
    ],
    subject,
    htmlContent,
  });
};

module.exports = { sendEmail };