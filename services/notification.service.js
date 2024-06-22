const config = require('../config');
const Mail = require('../utils/mail');

class Notification {
  static async sendAdminMail(contact) {
    const html = `
   <h3>New Message From ${contact.origin}</h3>
   <p>Name: ${contact.name}</p>
   <p>Email: ${contact.email}</p>
    <p>Phone: ${contact.phone}</p>
      <p>Company: ${contact.company}</p>
      <p>Website: ${contact.website}</p>
      <p>Product: ${contact.product}</p>
      <p>Quantity: ${contact.quantity}</p>
      <p>Location: ${contact.location}</p>
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
      <p>Thank you for contacting us about your interest in ${contact.product}. We will get back to you as soon as possible.</p>
      <p>If you have any more questions about ${contact.product} or any other products, feel free to reach out.</p>
    `;
    return await Mail.send({
      to: contact.email,
      subject: 'Thank you for contacting us',
      body: html
    })
  }
}

module.exports = Notification;