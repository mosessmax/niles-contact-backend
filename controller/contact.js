const ContactService = require('../services/contact.service');

class Contact {
 static async sendMessage(req, res, next) {
  try {
   const contact = new ContactService(req.body);
   const data = await contact.send(req.hostname);

   logger.info(data)
   res.status(data.code).json(data);
  } catch (error) {
   logger.error(error)
   res.status(error.code).json(error);
  }
 }
}

 module.exports = Contact;