import Joi from "joi";

function generalRule(title, min = 3, max = 50) {
  return {
    "any.required": `${title} is required`,
    "string.empty": `Please enter your ${title}`,
    "string.min": `${title} must have a minimum of ${min} characters`,
    "string.max": `${title} must have a maximum of ${max} characters`,
    "string.email": `The ${title} address must be a valid email.`,
  };
}

function phoneRule() {
  return {
    "any.required": `Phone number is required`,
    "string.empty": `Please enter a valid phone number`,
    "string.min": `Enter a number with at least 9 digits`,
  };
}

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages(generalRule("email")),
  firstName: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages(generalRule("first name", 3, 20)),
  lastName: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages(generalRule("last name", 3, 20)),
  address: Joi.string()
    .min(5)
    .max(30)
    .required()
    .messages(generalRule("address", 5, 30)),
  apartment: Joi.string()
    .min(5)
    .max(30)
    .required()
    .messages(generalRule("apartment", 5, 30)),
  city: Joi.string()
    .min(5)
    .max(30)
    .required()
    .messages(generalRule("city", 5, 30)),
  country: Joi.string()
    .min(5)
    .max(45)
    .required()
    .messages(generalRule("country", 5, 30)),
  phone: Joi.string().min(9).required().messages(phoneRule()),
  shippingPrice: Joi.number().required(),
});

export default schema;
