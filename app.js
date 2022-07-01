const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Instacaster listening on port ${port}`);
});
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const casts = await axios
    .get(`https://farcaster-search.gregskril.com/api/search?text=imgur`)
    .then((response) => response.data.casts)
    .catch((error) => console.error(error));
  res.render("pages/index", {
    casts: casts,
  });
});
