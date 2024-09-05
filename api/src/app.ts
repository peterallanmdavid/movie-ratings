import express, { Request, Response } from "express";
import cors from "cors";
import movies from "./db/movieRatings.json";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.get("/movies", (req: Request, res: Response) => {
  res.json(movies);
});

app.get("/movies/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const movieFound = movies.find((movie) => movie.id === id);
  if (movieFound) {
    res.json(movieFound);
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
