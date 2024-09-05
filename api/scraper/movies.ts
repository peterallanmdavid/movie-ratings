import { getImDBScores } from "./dataFetchers/imdb";
import { getMetacriticScores } from "./dataFetchers/metacritic";
import { getRotetenTomatoesScores } from "./dataFetchers/rottenTomatoes";
import { DataFetcher } from "./types";

export const movies = [
  { name: "casper", year: "1995" },
  { name: "drop dead fred", year: "1991" },
  { name: "dumb and dumber", year: "1994" },
  { name: "stand by me", year: "1986" },
  { name: "toy story", year: "1995" },
];

interface DataSource {
  provider: "imdb" | "rottenTomatoes" | "metacritic";
  fetcher: DataFetcher;
  name: string;
}

export const sources: DataSource[] = [
  {
    provider: "imdb",
    name: "IMDB",
    fetcher: getImDBScores,
  },
  {
    provider: "rottenTomatoes",
    name: "Rotten Tomatoes",
    fetcher: getRotetenTomatoesScores,
  },
  {
    provider: "metacritic",
    name: "Metacritic",
    fetcher: getMetacriticScores,
  },
];
