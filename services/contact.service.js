// const MailNotification = require('./notification.service');
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
 constructor(data, MailNotificationService) {
    this.mailNotification = mailNotificationService;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.company = data.company;
    this.website = data.website;
    this.product = data.product;
    this.quantity = data.quantity;
    this.location = data.location;
    this.message = data.message;
  }


  validateData() {
    // basic validation 
    if (!this.name || !this.email || !this.message) {
        return false;
    }
    return true;
}
 async send(origin) {
  this.origin = origin;
if (!this.validateData()) {
   return gen(HTTP_BAD_REQUEST, MAIL_FAILED);
  }

  try {
  const adminMail = await this.mailNotification.sendAdminMail(this);
  if (!adminMail) {
    throw new Error('failed to send admin mail');
  }

   const userMail = await this.mailNotification.sendUsersMail(this);
   if (userMail) {
    throw new Error('failed to send user mail');
   }
    return gen(HTTP_OK, MAIL_SENT);
} catch (error) {
    console.error(error);
    return gen(HTTP_INTERNAL_SERVER_ERROR, SERVER_ERROR);
}
}
}


module.exports = Contact;