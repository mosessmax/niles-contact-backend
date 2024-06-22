const config = require('../config');
const Mail = require('../utils/mail');

class Notification {
  static async sendAdminMail(contact) {
    const html = `
   <h3>New Message From ${contact.origin}</h3>
   <p>Name: ${contact.name}</p>
   <p>Email: ${contact.email}</p>
   <p>Message: ${contact.message}</p>
   `;
   return await Mail.send({
      to: config.smtp_from,
      subject: 'New message from ' + contact.origin,
      body: html
    })
    
  }

  static async sendUsersMail(contact) {
    const html = `
    <h3>Hello ${contact.name.split(' ')[0]},</h3>
    <p>Thank you for contacting us. We will get back to you as soon as possible.</p>`;
    return await Mail.send({
      to: contact.email,
      subject: 'Thank you for contacting us',
      body: html
    })
  }
}

module.exports = Notification;