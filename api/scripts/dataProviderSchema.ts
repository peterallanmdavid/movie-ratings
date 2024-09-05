import getImDBScores from "./imdb/dataFetcher";
import getRottenTomatoesScores from "./rottenTomatoes/dataFetcher";
import getMetacriticScores from "./metacritic/dataFetcher";
import { movieMap as imdbMovies } from "./imdb/movieMap";
import { movieMap as rottenTomatoesMovies } from "./rottenTomatoes/movieMap";
import { movieMap as metacriticMovies } from "./rottenTomatoes/movieMap";
import { Schema } from "./types";

export const schema: Schema = {
  imdb: {
    movieMaps: imdbMovies,
    fetcher: getImDBScores,
  },
  rottenTomatoes: {
    movieMaps: rottenTomatoesMovies,
    fetcher: getRottenTomatoesScores,
  },
  metacritic: {
    movieMaps: metacriticMovies,
    fetcher: getMetacriticScores,
  },
};
