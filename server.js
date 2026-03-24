const fs = require("fs");
const path = require("path");

const fastify = require("fastify")({
  logger: true,
  https: {
    key: fs.readFileSync(path.join(__dirname, "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert.pem")),
  },
});

const html = fs.readFileSync(path.join(__dirname, "index.html"));

fastify.get("*", (req, reply) => {
  reply.type("text/html").send(html);
});

const PORT = 443;

fastify.listen({ port: PORT, host: "0.0.0.0" }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`HTTPS server running at https://localhost:${PORT}`);
});
