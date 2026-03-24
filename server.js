const https = require("https");
const fs = require("fs");
const path = require("path");

// Load the self-signed certificate and private key
// Run `bash generate-cert.sh` first if these files don't exist
const options = {
  key: fs.readFileSync(path.join(__dirname, "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert.pem")),
};

const server = https.createServer(options, (req, res) => {
  const indexPath = path.join(__dirname, "index.html");

  fs.readFile(indexPath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 – index.html not found");
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

const PORT = 443;

server.listen(PORT, () => {
  console.log(`HTTPS server running at https://localhost:${PORT}`);
  console.log(`Serving: ${path.join(__dirname, "index.html")}`);
  console.log("Note: browsers will warn about the self-signed certificate — that's expected.");
});
