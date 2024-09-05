export type MovieNames =
  | "Casper"
  | "DropDeadFred"
  | "DumbAndDumber"
  | "StandByMe"
  | "ToyStory";

type Movie = Array<{
  url: string;
  movie: MovieNames;
}>;

export interface MovieRatings {
  imdb: Movie;
  rottenTomatoes: Movie;
  metacritic: Movie;
}

export const urlMapping: MovieRatings = {
  imdb: [
    {
      url: "https://www.imdb.com/title/tt0112642/",
      movie: "Casper",
    },
    {
      url: "https://www.imdb.com/title/tt0101775/",
      movie: "DropDeadFred",
    },
    {
      url: "https://www.imdb.com/title/tt0109686/",
      movie: "DumbAndDumber",
    },
    {
      url: "https://www.imdb.com/title/tt0092005/",
      movie: "StandByMe",
    },
    {
      url: "https://www.imdb.com/title/tt0114709/",
      movie: "ToyStory",
    },
  ],
  rottenTomatoes: [
    {
      url: "https://www.rottentomatoes.com/m/casper",
      movie: "Casper",
    },
    {
      url: "https://www.rottentomatoes.com/m/drop_dead_fred",
      movie: "DropDeadFred",
    },
    {
      url: "https://www.rottentomatoes.com/m/dumb_and_dumber",
      movie: "DumbAndDumber",
    },
    {
      url: "https://www.rottentomatoes.com/m/stand_by_me_1986",
      movie: "StandByMe",
    },
    {
      url: "https://www.rottentomatoes.com/m/toy_story",
      movie: "ToyStory",
    },
  ],
  metacritic: [
    {
      url: "https://www.metacritic.com/movie/casper",
      movie: "Casper",
    },
    {
      url: "https://www.metacritic.com/movie/drop-dead-fred/",
      movie: "DropDeadFred",
    },
    {
      url: "https://www.metacritic.com/movie/dumb-and-dumber",
      movie: "DumbAndDumber",
    },
    {
      url: "https://www.metacritic.com/movie/stand-by-me",
      movie: "StandByMe",
    },
    {
      url: "https://www.metacritic.com/movie/toy-story",
      movie: "ToyStory",
    },
  ],
};
