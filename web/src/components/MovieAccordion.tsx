import React, { useEffect, useState } from "react";
import { fetchMovies, MovieList } from "../utils/api";

const MoviesAccordion: React.FC = () => {
  const [movies, setMovies] = useState<MovieList>([]);
  const [error, setError] = useState<string | null>(null);

  const [openMovies, setOpenMovies] = useState<string[]>([]); // Track opened movies by ID

  const toggleAccordion = (id: string) => {
    if (openMovies.includes(id)) {
      setOpenMovies(openMovies.filter((movieId) => movieId !== id));
    } else {
      setOpenMovies([...openMovies, id]);
    }
  };

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
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className="overflow-hidden bg-white shadow sm:rounded-lg mb-10 p-4"
        >
          <div
            onClick={() => toggleAccordion(movie.id)}
            className="flex flex-row"
          >
            <h1 className="text-xl font-bold cursor-pointer capitalize flex-1">
              {movie.name} ({movie.year})
            </h1>
            <div>{movie.id && openMovies.includes(movie.id) ? "-" : "+"}</div>
          </div>
          {movie.id && openMovies.includes(movie.id) && (
            <div className="mt-10">
              <div className=" grid grid-rows-2 md:flex flex-row gap-5">
                <img
                  src={movie.sourceData?.[0]?.data?.url}
                  alt={`${movie.name} poster`}
                  className="shadow rounded"
                />
                <div className="flex flex-col gap-2">
                  <p className="flex flex-none md:flex-1 gap-2 text-lg text-gray-900">
                    {movie.sourceData?.[0]?.data?.plot}
                  </p>

                  <div className="flex flex-col">
                    {movie.sourceData.map((source, sourceIndex) => (
                      <div key={sourceIndex} className="flex flex-1 capitalize">
                        <p>
                          <strong>{source.name}:</strong>
                          <span className="text-3xl ml-5 font-bold text-green-800">
                            {Math.floor(source.data.rating)}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MoviesAccordion;
