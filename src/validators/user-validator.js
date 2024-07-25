import Joi from "joi";

const createuserValidator = Joi.object({
  email: Joi.string().min(1).max(255).required(),
  password: Joi.string().min(1).max(255).required(),
});

export { createuserValidator };
