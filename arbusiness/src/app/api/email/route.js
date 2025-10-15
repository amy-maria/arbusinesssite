import nodemailer from 'nodemailer';
import { google} from "googleapis";
import { access } from 'fs';


const OAuth2 = google.auth.OAuth2;

//updated oauth method for gmail, won't support basic-auth logins

console.log("ENV CHECK:", process.env.SMTP_USER);

export async function POST(req) {
//destructure message sent from the form
 
    const { firstName, lastName, organization, country, email, message } = await req.json();

    //validation check
    if (!firstName || !lastName || !email || !message) {
      return new Response (JSON.stringify({Message: 'Missing required fields'}),
      {status: 400}
      );
    }

   try {
    //setup oauth client
    const oauth2Client = new OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const accessTokenResponse = await oauth2Client.getAccessToken();
    const accessToken = accessTokenResponse?.token;
    //check if access token is returns null
    if (!accessToken) {
      throw new Error("Failed to retrieve access token from Google OAuth2");
    }

//create transporter object for gmail and oauth2

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.SMTP_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    accessToken: accessToken,
  },
});

//construct the email message from form
const name= `${firstName} ${lastName}`;
const organizationName= organization ? `(${organization})` : "";

//define email content
const mailOptions = {
  from: process.env.SMTP_USER,
  to: process.env.TO_EMAIL,
  subject: "Website Contact email from ${name}, ${organizationName}",
  replyTo: email,
  html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #1a202c; border-bottom: 2px solid #3182ce; padding-bottom: 10px;">New Contact Submission</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Full Name:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #3182ce;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Organization:</td>
              <td style="padding: 8px 0;">${organization || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Country:</td>
              <td style="padding: 8px 0;">${country}</td>
            </tr>
          </table>
          <h3 style="color: #2d3748; margin-top: 0;">Message:</h3>
          <div style="padding: 15px; background-color: #f7f7f7; border-radius: 4px; border-left: 3px solid #63b3ed; white-space: pre-wrap;">
            ${message}
          </div>
        </div>
      `,

};

const result = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", result);
    return new Response(JSON.stringify({ message: "Success" }), { status: 200 });
  } catch (error) {
    console.error("❌ Error sending email(OAuth2):", error);
    return new Response(JSON.stringify({ message: "Failed", error: error.message }), { status: 500 });
  }
} 
/* Verify transporter
await transporter.verify();

//send email message
  const info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s'.info.message.Id");

  return new Response (
  JSON.stringify({message: "Your message was sent successfully"}), {status: 200}
  );
  } catch (error){
    console.error("❌ Error sending email(OAuth2):",error);
    return new Response(
      JSON.stringify({
      message:'Failed to send message. Please try again.',
      error: error.message,
      stack: error.stack,
      }), 
      {status: 500}
    );
  }
}*/
