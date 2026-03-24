#!/bin/bash
# Generate a self-signed certificate for the HTTPS server
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365 -nodes \
  -subj "/C=US/ST=State/L=City/O=Dev/CN=localhost"

echo "✅ cert.pem and key.pem generated."
