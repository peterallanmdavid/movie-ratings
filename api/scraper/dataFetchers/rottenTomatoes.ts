import * as cheerio from "cheerio";
import { DataFetcher } from "../types";

const rottenTomatoesUrl = "https://www.rottentomatoes.com";

export const getRotetenTomatoesScores: DataFetcher = async ({ name, year }) => {
  try {
    const searchUrl = `${rottenTomatoesUrl}/search?search=${name}`;
    const response = await fetch(searchUrl);

    const $ = cheerio.load(await response.text());
    let movieUrl;

    $("search-page-media-row").each((i, element) => {
      const movieYear = $(element).attr("releaseyear");

      const href = $(element).find("a[data-qa='info-name']").attr("href");

      if (year === movieYear) {
        movieUrl = href;
      }
    });

    if (movieUrl) {
      const movieResponse = await fetch(movieUrl);

      const data = await movieResponse.text();
      const movieDetails = cheerio.load(data);
      const rating = movieDetails(
        'media-scorecard rt-button[slot="criticsScore"]'
      )
        .text()
        .trim();

      const plot = movieDetails("media-scorecard rt-text[slot='content']")
        .text()
        .trim();
      const url = movieDetails("media-scorecard rt-img").attr("src");

      return {
        rating: parseInt(rating),
        plot,
        url,
      };
    } else {
      console.log(`${name} movie found for year ${year}`);
      return undefined;
    }
  } catch (e) {
    return undefined;
  }
};
