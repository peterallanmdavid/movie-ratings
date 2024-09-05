import React, { useEffect, useState } from "react";
import { fetchMovies } from "../utils/api";

interface Rating {
  id: number;
  rating: number;
  date: string;
  source: string;
}

interface Movie {
  id: number;
  name: string;
  image_url: string;
  description: string;
  year: number;
  ratings: Rating[];
}

const MoviesAccordion: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const moviesData = await fetchMovies();
        setMovies(moviesData);
      } catch (err) {
        setError("Failed to fetch movies");
      }
    };

    getMovies();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <details key={movie.id}>
          <summary>
            {movie.name} ({movie.year})
          </summary>
          <div>
            <img
              src={movie.image_url}
              alt={movie.name}
              style={{ width: "200px" }}
            />
            <p>{movie.description}</p>
            <h4>Ratings:</h4>
            <ul>
              {movie.ratings.map((rating) => (
                <li key={rating.id}>
                  {rating.source}: {rating.rating}% (on {rating.date})
                </li>
              ))}
            </ul>
          </div>
        </details>
      ))}
    </div>
  );
};

export default MoviesAccordion;
