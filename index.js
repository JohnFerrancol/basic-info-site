import http from "node:http";
import { promises as fs } from "fs";

// Create a local server to receive data from
const server = http.createServer(async (req, res) => {
  const localHostURL = new URL(req.url, `http://${req.headers.host}`);

  try {
    let fileName;

    switch (localHostURL.pathname) {
      case "/":
        fileName = await fs.readFile("pages/index.html");
        break;
      case "/contact-me":
        fileName = await fs.readFile("pages/contact-me.html");
        break;
      case "/about":
        fileName = await fs.readFile("pages/about.html");
        break;
      default:
        fileName = await fs.readFile("pages/404.html");
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(fileName);
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "text/html" });
    res.end("Internal Server Error");
  }
});

server.listen(8080, () =>
  console.log("Server running on http://localhost:8080"),
);
