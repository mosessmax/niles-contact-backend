const joi = require('joi');
const name = joi.string().required();
const email = joi.string().email({
  minDomainSegments: 2
}).required();
const message = joi.string().min(2).required();

exports.contactSchema = joi.object().keys({
  name,
  email,
  message
});