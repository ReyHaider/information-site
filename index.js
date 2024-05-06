const http = require("http");
const path = require("path");
const fs = require("fs");

http
  .createServer(async (req, res) => {
    try {
      if (req.method === "GET") {
        let filepath;
        if (req.url === "/") {
          filepath = path.join(__dirname, "index.html");
        } else if (req.url === "/about") {
          filepath = path.join(__dirname, "about.html");
        } else if (req.url === "/contact-me") {
          filepath = path.join(__dirname, "contact-me.html");
        } else {
          filepath = path.join(__dirname, "404.html");
        }
        const data = await fs.promises.readFile(filepath, "utf8");
        if (filepath === path.join(__dirname, "404.html")) {
          res.writeHead(404, { "Content-Type": "text/html" });
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
        }
        res.write(data);
        res.end();
      } else {
        throw new Error("Server only supports GET requests.");
      }
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.write(error.message);
      res.end();
    }
  })
  .listen(8080, () => console.log("Server running on port 8080"));
