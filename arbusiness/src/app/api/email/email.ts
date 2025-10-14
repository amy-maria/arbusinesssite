import nodemailer from 'nodemailer';

const nodemailer = require("nodemailer");

//updated oauth method for gmail, won't support basic-auth logins


// Promise style (Node.js 8+)
try {
  await transporter.verify();
  console.log("Server is ready to take our messages");
} catch (err) {
  console.error("Verification failed", err);
}




export default async function handler(req, res) {
  //only allow POST requests
  if (req.method!== 'POST') {
    return res.status(405).json({message:"Not Allowed"})
  };
}

//destructure message sent from the form
const { firstName, lastName, organization, country, email, message}=req.body;
//validation check
if (!firstName || !lastName || !email || !message) {
  return res.status(400).json({Message: 'Missing required fields'});
}
//construct the email message from form
const name= ${firstName} ${lastName};
const organizationName= organization ? (${organization}) : "";

//create transporter object for gmail and oauth2

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "process.env.SMTP_USER",
    clientId: "process.env.GOOGLE_CLIENT_ID",
    clientSecret: "process.env.GOOGLE_CLIENT_SECRET",
    refreshToken: "process.env.GOOGLE_REFRESH_TOKEN",
  },
});
//define email content
const mailOptions = {
  from:process.env.SMTP_USER
  to: process.env.TO_EMAIL,
  subject: New Message from ${name} ${organizationName},
  replyTo: email,
  // HTML body for rich email content
html: `
  <div style="font-family: Inter, Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
    <h2 style="color: #1a202c; border-bottom: 2px solid #3182ce; padding-bottom: 10px;">New Contact Submission</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr><td style="padding: 8px 0; font-weight: bold; width: 30%;">Full Name:</td><td style="padding: 8px 0;">${name}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #3182ce;">${email}</a></td></tr>
      <tr><td style="padding: 8px 0; font-weight: bold;">Organization:</td><td style="padding: 8px 0;">${organization || 'N/A'}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: bold;">Country:</td><td style="padding: 8px 0;">${country}</td></tr>
    </table>
    
    <h3 style="color: #2d3748; margin-top: 0;">Message:</h3>
    <div style="padding: 15px; background-color: #f7f7f7; border-radius: 4px; border-left: 3px solid #63b3ed; white-space: pre-wrap;">
      ${message}
    </div>
  </div>
`,
};

//send email message
try {
  const info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s'.info.message.Id");
  res.status(200).json({message: "Your message was sent successfully"});
  { catch (error){
    console.error('Error sending email(OAuth2):,error');
    res.status(500).json({
      message:'Failed to send message. Please try again.', error: error.message
    });
  }
}
