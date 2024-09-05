const baseUrl = process.env.REACT_APP_API_BASE_URL;
console.log("baseUrl", baseUrl);
export const fetchMovies = async () => {
  const response = await fetch(`${baseUrl}/movies`);
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  return response.json();
};
