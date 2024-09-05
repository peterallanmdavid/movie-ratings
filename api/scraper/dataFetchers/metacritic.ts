import * as cheerio from "cheerio";
import { DataFetcher } from "../types";

const baseUrl = "https://metacritic.com";

export const getMetacriticScores: DataFetcher = async ({ name, year }) => {
  try {
    const searchUrl = `${baseUrl}/search/${name}`;
    const response = await fetch(searchUrl);

    const $ = cheerio.load(await response.text());
    let movieUrl;
    let imageUrl;
    $(".c-pageSiteSearch-results .g-grid-container a").each((i, el) => {
      const movieImage = $(el).find(".g-container-rounded-small").attr("src");
      const movieYear = $(el).find(".u-text-uppercase").text().trim();
      const href = $(el).attr("href");

      if (year === movieYear) {
        movieUrl = href;
        imageUrl = movieImage;
      }
    });

    if (movieUrl) {
      const movieResponse = await fetch(`${baseUrl}${movieUrl}`);

      const movieDetails = cheerio.load(await movieResponse.text());

      const rating = movieDetails(".c-productScoreInfo_scoreNumber")
        .first()
        .find(".c-siteReviewScore span")
        .text()
        .trim();

      const plot = movieDetails(".c-productDetails_description").first().text();

      return {
        rating: parseInt(rating),
        plot,
        url: imageUrl,
      };
    } else {
      console.log(`${name} movie found for year ${year}`);
      return undefined;
    }
  } catch (e) {
    return undefined;
  }
};
