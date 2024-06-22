const MailNotification = require('./notification.service');
const {
 gen
} = require("../utils/http.response"),
 {
  MAIL_SENT,
  MAIL_FAILED,
  SERVER_ERROR
 } = require("../utils/http.response.message"), {
  HTTP_OK,
  HTTP_BAD_REQUEST,
  HTTP_INTERNAL_SERVER_ERROR
 } = require("../utils/http.response.code");

class Contact {
 constructor(data) {
  this.name = data.name;
  this.email = data.email;
  this.message = data.message;
 }

 async send(origin) {
  this.origin = origin;
  if (!this.name || !this.email || !this.message) {
   return gen(HTTP_BAD_REQUEST, MAIL_FAILED);
  }

  const adminMail = await MailNotification.sendAdminMail(this);
  if (adminMail) {
   const userMail = await MailNotification.sendUsersMail(this);
   if (userMail) {
    return gen(HTTP_OK, MAIL_SENT);
   }else {
    throw gen(HTTP_INTERNAL_SERVER_ERROR, SERVER_ERROR);
   }
  } else throw gen(HTTP_INTERNAL_SERVER_ERROR, SERVER_ERROR);
 }
}

module.exports = Contact;