const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

let players = [
  { name: "Alex", franchise: "Detroit Red Wings", rookieYear: 1983 },
  { name: "Brendan", franchise: "Buffalo Sabres", rookieYear: "N/A" },
  { name: "Frederik", franchise: "Philadelphia Flyers", rookieYear: 2010 },
];

app.get("/api/players", (req, res) => {
  res.send(players);
});

// Request of type localhost:300/api/players/Alex
app.get("/api/players/:name", (req, res) => {
  const player = players.find((p) => p.name === req.params.name);
  if (!player)
    res
      .status(404)
      .send(`The player with name ${req.params.name} was not found`);
  res.send(player);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
