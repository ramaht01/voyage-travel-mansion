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
    console.error("Brevo email delivery failed", {
      statusCode: error.statusCode ?? "unknown",
    });

    throw error;
  }
};

const escapeHtml = (value) => {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

module.exports = { sendEmail, escapeHtml };
