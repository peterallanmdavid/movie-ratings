import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Middleware to parse incoming JSON requests
app.use(express.json());

// Sample movie data
const movie = {
  id: 1,
  name: "Casper",
  image_url: "https://i.imgur.com/v7o4j9g.png",
  description:
    "A young boy who discovers he is a vampire and must learn to control his powers.",
  year: 2022,
  ratings: [
    {
      id: 1,
      rating: 95,
      date: "2023-05-01asda",
      source: "IMDB",
    },
    {
      id: 2,
      rating: 45,
      date: "2023-05-02",
      source: "Metacritic",
    },
    {
      id: 3,
      rating: 22,
      date: "2023-05-03",
      source: "Rotten Tomatoeasdass",
    },
  ],
};

// Route to get all movies (in this case, just one)
app.get("/movies", (req: Request, res: Response) => {
  res.json([movie]);
});

// Route to get a movie by ID
app.get("/movies/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  if (parseInt(id, 10) === movie.id) {
    res.json(movie);
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
