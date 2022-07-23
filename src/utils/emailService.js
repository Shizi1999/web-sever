require('dotenv').config();
const nodemailer = require('nodemailer');

async function sentVerifyCode({ receiverEmail, code }) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'Shizi, "<no-reply@shizi.com>"', // sender address
    to: receiverEmail, // list of receivers
    subject: 'The Drink', // Subject line
    html: `<p>Ma xac thuc cua ban la: <strong fontsize="20px">${code}</strong></p> `,
  });
}
async function sentResetPasswordLink({ receiverEmail, token }) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'Shizi, "<no-reply@shizi.com>"', // sender address
    to: receiverEmail, // list of receivers
    subject: 'The Drink', // Subject line
    html: `<p>Link dat lai mat khau co thoi han la 5p. <a href="http://localhost:3000/repassword?t=${token}">Click me</a></p> `,
  });
}

module.exports = {
  sentVerifyCode,
  sentResetPasswordLink,
};
