const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

const sendEmail = async ({ to, subject, htmlContent }) => {
  try {
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
  } catch (error) {
    console.error("BREVO ERROR STATUS:", error.statusCode);
    console.error("BREVO ERROR MESSAGE:", error.message);
    console.error("BREVO ERROR DETAILS:", error.body);
    console.error("BREVO RAW RESPONSE:", error.rawResponse?.body);

    throw error;
  }
};

module.exports = { sendEmail };
