const express = require("express");
const cors = require("cors");
const webshot = require("node-webshot");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  const url = req.query.url || "google.com";
  res.send(url);

  var renderStream = webshot(url, "./output.png", {
    phantomPath: path.join(__dirname, "vendor/phantomjs/bin/phantomjs"),
  });

  var buffer = Buffer.from("");

  renderStream.on("data", function (data) {
    if (data) buffer = Buffer.concat([buffer, data]);
  });

  renderStream.on("end", () => {
    res.set({ "Content-Type": "image/png" });

    res.send(buffer);
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
