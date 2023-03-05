import mongoose from "mongoose";
import Joi from "joi";

const validate = (customerObj) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    phone: Joi.string().min(5).max(12).required(),
    isGold: Joi.boolean().required(),
  });
  const validationResult = schema.validate({
    name: customerObj.name,
    phone: customerObj.phone,
    isGold: customerObj.isGold,
  });
  return validationResult;
};

const Customer = mongoose.model(
  "customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 12,
    },
    isGold: {
      type: Boolean,
      default: false,
      required: true,
    },
  })
);

export { validate, Customer };
