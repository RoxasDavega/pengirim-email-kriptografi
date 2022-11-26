const Joi = require("joi");

const sendMailSchema = Joi.object({
    email: Joi.string().email().required(),
    subject: Joi.string().required(),
    bodyMail: Joi.string().required(),
});

module.exports = { sendMailSchema };