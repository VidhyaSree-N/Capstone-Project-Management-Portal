const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

async function sendEmail(to, subject, name, email, password, type = 1, courseName = "") {

    // type 1 for confirmation mail 
    // type 2 for token sending for forgotpassword

    var bodyIntro = `This is a confirmation email that you are now registered on CAMS - U Mass Boston.`;
    var bodyOutro = `Following are your login credentials \n email: ${email} \n password: ${password} \n Sign in here: http://localhost:3000/signin`
    if (type == 2) {
        bodyIntro = 'This is an email for Reseting your Password';
        bodyOutro = `Following is the link to resetting your password  http://localhost:3000/forgot-password/${password}`
    }
    if (type === 3) {
        bodyIntro = `You have been added to ${courseName} by Prof. Kenneth K Fletcher on CAMS`;
        bodyOutro = `Following are your login credentials \n email: ${email} \n password: ${password} \n Sign in here: http://localhost:3000/signin`
    }

  let config = {
      service: 'gmail',
      auth: {
          user: "cs682cpms@gmail.com",
          pass: "ehlktjlicrmgowfg"
      }
  }
  
  let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "CAMS UMass Boston",
            link: 'https://mailgen.js/'
        }
    })

    let response = {

        body: {
            name: `${name}`,
            intro: bodyIntro,
            outro: bodyOutro,
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from:  "csc682cpms@gmail.com",
        to: to,
        subject: subject,
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return console.log({
            msg: "email sent successfully!"
        })
    }).catch(error => {
        return console.log({
            error
        })
    })

    // res.status(201).json("getBill Successfully...!");

}

module.exports = {
  sendEmail
}