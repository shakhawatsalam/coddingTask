import nodemailer from "nodemailer";
import Mailgen from "mailgen";


import ENV from '../config.js';


let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: ENV.EMAIL, // generated ethereal user
        pass: ENV.PASSWORD, // generated ethereal password
    },
};

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
});


/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "example123",
  "password" : "admin123",
  "text" : "admin123",
  "subject" : "admin123",
}
*/

export const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;


    // body of the Email
    var email = {
        body: {
            name: username,
            intro: text || 'Welcome to our shop',
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }

    var emailBody = MailGenerator.generate(email);

    let message = {
        form: ENV.EMAIL,
        to: userEmail,
        subject: subject || "signup Successfully",
        html: emailBody
    }

    // send mail
    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg: "You Should Receve an email for us" })
        })
        .catch(error => res.status(500).send({ error }))
}
