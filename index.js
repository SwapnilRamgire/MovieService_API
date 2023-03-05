// Imports
import express from "express";
import mongoose from "mongoose";
// Importing routes
import { genres } from "./routes/genres.js";
import { customers } from "./routes/customers.js";
import { movies } from "./routes/movies.js";
import { rentals } from "./routes/rentals.js";

mongoose
  .connect("mongodb://localhost/vidly")
  .then(console.log("Connected to database..."))
  .catch((err) => {
    console.log("Failed to connect database...", err);
  });

// All declarations
const PORT = process.env.PORT || 3000;
const app = express();

// Adding middleware
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);

app.get("/", (req, res) => res.send("Welcome to Vidly."));

app.listen(PORT, () => console.log(`Listening on ${PORT}...........`));
