const express = require("express");
const cors = require("cors");
const webshot = require("node-webshot");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  const url = req.query.url;

  var renderStream = webshot(url);

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