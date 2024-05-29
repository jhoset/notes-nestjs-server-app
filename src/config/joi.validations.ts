const Joi = require('joi');

export const JoiValidations = Joi.object({
  PORT: Joi.number().integer().min(1).max(65535).default(3000),
  DATABASE_URL: Joi.string(),
  JWT_SECRET: Joi.string().required(),
});
