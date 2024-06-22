const ContactService = require('../services/contact.service');

class Contact {
 static async sendMessage(req, res, next) {
  try {
   const contact = new ContactService(req.body);
   const data = await contact.send(req.hostname);

   logger.info(data)
   res.status(data.code).json(data);
  } catch (error) {
    logger.error(error);
    const statusCode = error.code || 500; 
    res.status(statusCode).json({
      message: error.message || 'an unexpected error occurred',
      ...error
    });
  }
 }
}


 module.exports = Contact;