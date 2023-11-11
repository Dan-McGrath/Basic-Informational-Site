const http = require("http");
const fs = require("fs");
const url = require("url");

const page404 = fs.readFileSync("404.html", (err, data) => {
  if (err) throw err;
  return data;
});

http
  .createServer((request, response) => {
    const query = url.parse(request.url, true);
    const file =
      query.pathname === "/" ? "./index.html" : `.${query.pathname}.html`;

    fs.readFile(file, (err, data) => {
      if (err) {
        response.writeHead(404, { "Content-type": "text/html" });
        response.write(page404);
        return response.end();
      }
      response.writeHead(200, { "Content-type": "text/html" });
      response.write(data);
      return response.end();
    });
  })
  .listen(8080);
