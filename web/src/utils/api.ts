const baseUrl = process.env.REACT_APP_API_BASE_URL;

export interface Movie {
  id: string;
  name: string;
  year: string;
  sourceData: {
    provider: string;
    name: string;
    data: {
      rating: number;
      plot: string;
      url: string;
    };
  }[];
}

export type MovieList = Movie[];

export const fetchMovies = async (): Promise<MovieList> => {
  const response = await fetch(`${baseUrl}/movies`);
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  return response.json();
};
