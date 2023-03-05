import mongoose from "mongoose";
import Joi from "joi";
import joiObjectid from "joi-objectid";
const objectId = joiObjectid(Joi);

const validate = (rentalObj) => {
  const schema = Joi.object({
    customerId: objectId().required(),
    movieId: objectId().required(),
  });

  const validationResult = schema.validate({
    customerId: rentalObj.customerId,
    movieId: rentalObj.movieId,
  });

  return validationResult;
};

const Rental = mongoose.model(
  "rental",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
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
        },
      }),
      required: true,
    },
    movie: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          trim: true,
          minlength: 2,
          maxlength: 50,
        },
        dailyRentalRate: {
          type: Number,
          required: true,
          min: 0,
          max: 255,
        },
      }),
      required: true,
    },
    rentalDate: {
      type: Date,
      default: Date.now,
    },
    returnedDate: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
  })
);

export { validate, Rental };
