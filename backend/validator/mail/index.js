const { sendMailSchema } = require("./schema");

function validateSendMailSchema(payload) {
  const validateResult = sendMailSchema.validate(payload);
  if (validateResult.error) {
    throw new Error(validateResult.error.message);
  }
}

module.exports = { validateSendMailSchema };
