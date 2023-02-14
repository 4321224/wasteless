const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

async function SendEmail(email, username) {
  try {
    let transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail", // true for 465, false for other ports
        auth: {
          user: "kareen.anna2@gmail.com", // generated ethereal user
          pass: "kcndofzvfrkyqpgw", // generated ethereal password
        },
      })
    );
    await transporter.sendMail({
      from: "kareen.anna2@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Appointment", // Subject line
      html: ` <div>
    <h1> Selamat ${username} Anda Telah membuat janji temu </h1>
    <p>Silahkan Klik Link ini untuk bisa login : <span><a href="https://">Login </a></span></p>
</div>`,
    });
  } catch (error) {
    console.log(error, "<<< ini error nodemailer");
  }
}

module.exports = SendEmail;
