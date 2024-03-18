const http = require("http");
const env = require("dotenv");

env.config({
  path: "./.env",
});

const server = http.createServer((req, res) => {
  res.end("Hello, World!");
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
