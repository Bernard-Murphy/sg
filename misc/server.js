const express = require("express");
const path = require("path");
const http = require("http");

const app = express();
const port = process.env.PORT || 6363;

app.use(express.static(path.join(__dirname, "..", "ui", "dist")));

const server = http.createServer(app);

server.listen(port, () => console.log("sg running on port", port));
