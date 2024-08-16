import Joi from "joi";

export const contactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().email().required(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().min(3).max(20).optional()
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string(),
  email: Joi.string().email(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().min(3).max(20).optional()
}).or('name', 'phoneNumber', 'email', 'isFavourite', 'contactType');

