import mongoose from "mongoose";
import Joi from "joi";
import { genreSchema } from "../models/genre.js";
import joiObjectid from "joi-objectid";
const objectId = joiObjectid(Joi);

const validate = (movieObj) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    genreId: objectId().required(),
    numberInStocks: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  });
  const validationResult = schema.validate({
    name: movieObj.name,
    genreId: movieObj.genreId,
    numberInStocks: movieObj.numberInStocks,
    dailyRentalRate: movieObj.dailyRentalRate,
  });
  return validationResult;
};

const Movie = mongoose.model(
  "movie",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStocks: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
  })
);

export { validate, Movie };
