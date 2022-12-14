const Joi = require("joi");

const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  fullName: Joi.string().min(4).required(),
  password: Joi.string().min(8).required(),
}).unknown();

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
}).unknown();

const updateUserSchema = Joi.object({
    fullName: Joi.string().min(4).required(),
    password: Joi.string().min(8).required(),
});

module.exports = { createUserSchema, loginUserSchema, updateUserSchema };
