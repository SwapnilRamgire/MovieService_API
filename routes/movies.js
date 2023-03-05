import express from "express";
import { Movie, validate } from "../models/movie.js";
import { Genre } from "../models/genre.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort();
  if (!movies)
    return res.status(404).send("Oops! Movies are not available right now :(");
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie)
    return res
      .status(404)
      .send(`Movie with id : ${req.params.id} does not exists...`);
  res.send(movie);
});

router.post("/", async (req, res) => {
  const getValidation = validate(req.body);
  if (getValidation.error)
    return res.status(400).send(getValidation.error.details[0].message);

  const requiredGenre = await Genre.findById(req.body.genreId);
  if (!requiredGenre)
    return res
      .status(400)
      .send(`Genre with id : ${req.body.genreId} does not exists...`);

  const newMovie = new Movie({
    name: req.body.name,
    genre: {
      _id: requiredGenre._id,
      genre: requiredGenre.genre,
    },
    numberInStocks: req.body.numberInStocks,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  await newMovie.save();
  res.send(newMovie);
});

router.put("/:id", async (req, res) => {
  const getValidation = validate(req.body);
  if (getValidation.error)
    return res.status(400).send(getValidation.error.details[0].message);

  const requiredGenre = await Genre.findById(req.body.genreId);
  if (!requiredGenre)
    return res
      .status(400)
      .send(`Genre with id : ${req.body.genreId} does not exists...`);
  const updatedMovie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      genre: {
        _id: requiredGenre._id,
        genre: requiredGenre.genre,
      },
      numberInStocks: req.body.numberInStocks,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );
  if (!updatedMovie)
    return res
      .status(404)
      .send(`Movie with id ${req.params.id} does not exists...`);

  res.send(updatedMovie);
});

router.delete("/:id", async (req, res) => {
  const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
  if (!deletedMovie)
    return res
      .status(404)
      .send(`Movie with id ${req.params.id} does not exists...`);
  res.send(deletedMovie);
});

export { router as movies };
