// start api and web
module.exports = {
  apps: [
    {
      name: "api",
      script: "cd api && npm run dev",
      watch: true,
    },
    {
      name: "scraper",
      script: "cd api && npm run start-scraper",
      cron_restart: "0 0 * * *", // This cron expression runs the script every day,
      time: true, // Enable time logging in the output
      log_date_format: "YYYY-MM-DD HH:mm Z", // Format for the logs,
      watch: true,
      autorestart: false,
    },
    {
      name: "web",
      script: "cd web && npm run start",
      watch: true,
    },
  ],
};
