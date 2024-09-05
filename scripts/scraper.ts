import * as cheerio from "cheerio";
import * as fs from "fs/promises"; // Use fs/promises for async/await
import { MovieNames, urlMapping } from "./urlMapping";
import { schema } from "./dataProviderSchema";
import { Schema } from "./types";

// can be replace by actual saving to the database
async function saveRatingsToFile(filename: string, data: any) {
  try {
    await fs.writeFile(filename, JSON.stringify(data, null, 2), "utf-8");
    console.log(`Ratings saved to ${filename}`);
  } catch (error) {
    console.error("Error saving ratings to file:", error);
  }
}

(async () => {
  const ratings = await Promise.all(
    Object.keys(schema).map(async (dataSource) => {
      const { movieMaps, fetcher } = schema?.[dataSource as keyof Schema];
      const providerData = await fetcher(movieMaps);

      return {
        provider: dataSource,
        data: providerData,
      };
    })
  );

  console.log('Movie Ratings for "All Movies":', ratings);

  // Save the ratings to a JSON file
  await saveRatingsToFile("db/movieRatings.json", ratings);
})();
