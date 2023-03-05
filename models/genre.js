import Joi from "joi";
import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
  genre: {
    type: String,
    required: true,
    minlength: 2,
  },
});

const validate = (genreObj) => {
  const schema = Joi.object({
    genre: Joi.string().required().min(2),
  });
  const validationResult = schema.validate({ genre: genreObj.genre });
  return validationResult;
};

const Genre = mongoose.model("genre", genreSchema);

export { validate, Genre, genreSchema };
