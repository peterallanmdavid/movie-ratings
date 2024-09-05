import * as cheerio from "cheerio";
import { DataFetcher } from "../types";

const imdbBaseUrl = "https://www.imdb.com";

export const getImDBScores: DataFetcher = async ({ name, year }) => {
  try {
    const searchUrl = `${imdbBaseUrl}/find/?q=${name}`;
    const response = await fetch(searchUrl);

    const $ = cheerio.load(await response.text());
    let movieUrl;
    $("li.ipc-metadata-list-summary-item").each((_index, element) => {
      const movieYear = $(element)
        .find("ul.ipc-inline-list span.ipc-metadata-list-summary-item__li")
        .first()
        .text()
        .trim();

      const href = $(element)
        .find("a.ipc-metadata-list-summary-item__t")
        .attr("href");

      if (movieYear === year) {
        movieUrl = href;
      }
    });

    if (movieUrl) {
      const movieResponse = await fetch(`${imdbBaseUrl}${movieUrl}`);

      const movieDetails = cheerio.load(await movieResponse.text());
      const rating1st = movieDetails(
        'div[data-testid="hero-rating-bar__aggregate-rating__score"] '
      )
        .first()
        .find("span")
        .eq(0)
        .text()
        .trim();

      const rating2nd = movieDetails(
        'div[data-testid="hero-rating-bar__aggregate-rating__score"] '
      )
        .first()
        .find("span")
        .eq(1)
        .text();

      const rating =
        (parseFloat(rating1st) / parseFloat(rating2nd.replace("/", ""))) * 100;

      const plot = movieDetails('p[data-testid="plot"] span').first().text();
      const url = movieDetails(
        'div[data-testid="hero-media__poster"] > div >img'
      ).attr("src");

      return {
        rating,
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
