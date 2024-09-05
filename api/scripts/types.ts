export type MovieNames =
  | "Casper"
  | "DropDeadFred"
  | "DumbAndDumber"
  | "StandByMe"
  | "ToyStory";

export type Movie = {
  url: string;
  name: MovieNames;
};

export interface Ratings {
  name: MovieNames;
  rating: number;
}

export type MovieMap = Movie[];
export type DataFetcher = (movie: MovieMap) => Promise<Ratings[]>;

export interface DataSource {
  movieMaps: MovieMap;
  fetcher: DataFetcher;
}

export interface Schema {
  imdb: DataSource;
  rottenTomatoes: DataSource;
  metacritic: DataSource;
}
