import express from "express";
import { validate, Genre } from "../models/genre.js";

const router = express.Router();

const getAllGenres = async (req, res) => {
  const genres = await Genre.find().sort("genre");
  res.send(genres);
};

const getGenreById = async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res
      .status(404)
      .send(`Genre with id: ${req.params.id} does not exists`);
  res.send(genre);
};

const createGenre = async (req, res) => {
  const getValidation = validate(req.body);
  if (getValidation.error)
    return res.status(400).send(getValidation.error.details[0].message);
  const genre = new Genre({
    genre: req.body.genre,
  });
  await genre.save();
  res.send(genre);
};

const updateGenre = async (req, res) => {
  const getValidation = validate(req.body);
  if (getValidation.error)
    return res.status(400).send(getValidation.error.details[0].message);
  const genreUpdate = await Genre.findByIdAndUpdate(
    req.params.id,
    { genre: req.body.genre },
    { new: true }
  );
  if (!genreUpdate)
    return res
      .status(404)
      .send(`Genre with id: ${req.params.id} does not exists`);

  res.send(genreUpdate);
};

const deleteGenre = async (req, res) => {
  const genreToDelete = await Genre.findByIdAndDelete(req.params.id);
  if (!genreToDelete)
    return res
      .status(404)
      .send(`Genre with id: ${req.params.id} does not exists`);
  res.send(genreToDelete);
};

router.get("/", getAllGenres);
router.get("/:id", getGenreById);
router.post("/", createGenre);
router.put("/:id", updateGenre);
router.delete("/:id", deleteGenre);

export { router as genres };
