const {contactSchema} = require('../utils/request.schema');
const validator = require('../utils/validator');

exports.validateContact = async (req, res, next) => {
 const valid = await validator(contactSchema, req.body);
  if(valid.ok){
   next()
  }
  else {
   res.status(valid.code).json(valid);
  }
}