import { movies, sources } from "./movies";
import * as fs from "fs/promises";
import { v4 } from "uuid";
import * as path from "path";

async function saveRatingsToFile(filename: string, data: any) {
  try {
    // Get the directory from the filename
    const dir = path.dirname(filename);

    // Ensure the directory exists
    await fs.mkdir(dir, { recursive: true });

    // Write the file
    await fs.writeFile(filename, JSON.stringify(data, null, 2), "utf-8");

    console.log(`Ratings saved to ${filename}`);
  } catch (error) {
    console.error("Error saving ratings to file:", error);
  }
}

(async () => {
  const ratings = await Promise.all(
    movies.map(async ({ name, year }) => {
      const data = await Promise.allSettled(
        sources.map(async ({ provider, name: providerName, fetcher }) => {
          const providerData = await fetcher({ name, year });
          return {
            provider,
            name: providerName,
            data: providerData,
          };
        })
      ).then((results) =>
        results.map((result) => {
          if (result.status === "fulfilled") {
            return result.value;
          } else {
            console.log(`Failed scraping data for ${name} (${year})`);
          }
        })
      );

      return {
        id: v4(),
        name,
        year,
        sourceData: data,
      };
    })
  );

  await saveRatingsToFile("src/db/movieRatings.json", ratings);
})();
