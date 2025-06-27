import nodemailer from 'nodemailer' 


// Create a transporter for SMTP
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


const sendEmail = async ({ to, subject, body }) => {
  try {
    const response = await transporter.sendMail({
      from: `"Show Ticket" <${process.env.SENDER_EMAIL}>`,
      to,
      subject,
      html: body,
    });
    console.log("✅ Email sent:", response.messageId);
    return response;
  } catch (error) {
    console.error("🚨 Failed to send email:", error);
    throw error;
  }
};


export default sendEmail