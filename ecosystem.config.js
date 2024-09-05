// start api and web
module.exports = {
  apps: [
    {
      name: "api",
      script: "cd api && npm run dev",
      watch: true,
    },
    {
      name: "web",
      script: "cd web && npm run start",
      watch: true,
    },
  ],
};
