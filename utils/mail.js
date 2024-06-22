const path = require("path");
const config = require(path.resolve("config"));
const nodemailer = require("nodemailer");
const { info, error, success } = require('consola');

exports.send = async function(message) {
    info("sending mail to", message.to+'...');
    const transporter = nodemailer.createTransport({
        host: config.smtp_host,
        port: 587, // 587 465
        secure: false,
        auth: {
            user: config.smtp_from,
            pass: config.smtp_secret
        }
    })
    const packet = {
        from: `"${config.smtp_user}" <${config.smtp_from}>`,
        to: message.to,
        replyTo: `<${config.smtp_reply_to}>`,
        subject: message.subject,
        html: message.body
    };

    try {
        let ret;
        /* send the mail */
        transporter.sendMail(packet, (err, infos) => {
            if (err) {
                error("email sending failed:", err.message);
                info("attempting to send mail again...");
                return transporter.sendMail(packet, (err, info) => {
                    if (err) {
                        error("Failed to send mail");
                        ret = false;
                    } else {
                     success("Email sent to:", info.messageId, "after failed trial ");
                     ret = true;
                    }
                });
            } else {
             success("Email sent to:", infos.messageId);
             ret = true;
            }
        });
        return ret || true
    } catch (e) {
        throw new Error("Something is wrong with the mail service, please try again.");
    }
};


