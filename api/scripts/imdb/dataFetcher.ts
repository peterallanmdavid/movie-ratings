import * as cheerio from "cheerio";
import { DataFetcher, MovieMap } from "../types";

const getImDBScores: DataFetcher = async (moveMappings) => {
  try {
    const ratings = await Promise.all(
      moveMappings.map(async ({ url, name }) => {
        const response = await fetch(url);
        const data = await response.text();
        const $ = cheerio.load(data);
        const rating1st = $(
          'div[data-testid="hero-rating-bar__aggregate-rating__score"] '
        )
          .first()
          .find("span")
          .eq(0)
          .text()
          .trim();

        const rating2nd = $(
          'div[data-testid="hero-rating-bar__aggregate-rating__score"] '
        )
          .first()
          .find("span")
          .eq(1)
          .text();

        return {
          name,
          rating:
            (parseFloat(rating1st) / parseFloat(rating2nd.replace("/", ""))) *
            100,
        };
      })
    );

    return ratings;
  } catch (error) {
    console.error("Error fetching IMDb ratings:", error);
    return [];
  }
};

export default getImDBScores;
