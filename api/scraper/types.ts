export interface MovieMap {
  name: string;
  year: string;
}

export interface Ratings {
  rating: number | undefined;
  plot: string | undefined;
  url: string | undefined;
}

export type DataFetcher = (movie: MovieMap) => Promise<Ratings | undefined>;
