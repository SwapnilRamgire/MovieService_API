import express from "express";
import { Rental, validate } from "../models/rental.js";
import { Customer } from "../models/customer.js";
import { Movie } from "../models/movie.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-rentalDate");
  if (!rentals) return res.status(404).send(`No rentals found :(`);
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const getValidation = validate(req.body);
  if (getValidation.error)
    return res.status(400).send(getValidation.error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer)
    return res
      .status(404)
      .send(`User with id : ${req.body.customerId}, does not exists`);

  const movie = await Movie.findById(req.body.movieId);
  if (!movie)
    return res
      .status(404)
      .send(`Movie with id : ${req.body.movieId}, does not exists`);

  if (!movie.numberInStocks)
    return res.status(400).send(`Movie is not in stock`);

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      name: movie.name,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  await rental.save();

  movie.numberInStocks--;
  movie.save();

  res.send(rental);
});

export { router as rentals };
