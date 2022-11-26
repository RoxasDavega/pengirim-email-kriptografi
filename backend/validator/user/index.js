const { createUserSchema, loginUserSchema, updateUserSchema } = require("./Schema");

function validateCreateUserSchema(payload) {
    const validateResult = createUserSchema.validate(payload);
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

function validateLoginUserSchema(payload) {
    const validateResult = loginUserSchema.validate(payload);
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

function validateUpdateUserSchema(payload) {
    const validateResult = updateUserSchema.validate(payload);
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

module.exports = { validateCreateUserSchema, validateLoginUserSchema, validateUpdateUserSchema };