
import nodemailer from 'nodemailer';

interface EmailContent {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
}
export const sendEmail = async (
    { from, to, subject, text, html }: EmailContent) => {

    const transporter = nodemailer.createTransport({
        port: 465,
        // service: 'gmail',
        host: "smtp.gmail.com",
        auth: {
            user: process.env.GOOGLE_EMAIL_SERVER || "dat198hp@gmail.com",
            pass: process.env.GOOGLE_APP_PASS || "qsgc rqca guml jzsh"
            // user: "dat198hp@gmail.com",
            // pass: "qsgc rqca guml jzsh"
            //qsgc rqca guml jzsh

        },
        secure: true
    });

    await new Promise((resolve, reject) => {
        //send email
        transporter.sendMail({
            from,
            to,
            subject,
            text,
            html
        }, (err) => {
            console.log(err)
            reject(err)
        })
    })
    return true
}