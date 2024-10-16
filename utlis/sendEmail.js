import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();


// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async function (email, subject, message) {
  console.log(email,message)
  console.log( process.env.SMTP_PORT,process.env.SMTP_HOST,)
 
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });
 


  await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL, 
    to: email, // user email
    subject: subject, // Subject line
    html: message, // html body
  });
};

export default sendEmail;