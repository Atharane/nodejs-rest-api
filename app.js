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

app.post("/api/players", async (req, res) => {
  // 4oo bad request

  // manual validation
  /*
    if (!req.body.name) {
        res.status(400).send("Name field is mandatory");
        return;
    }
    */

  // Joi validation
  const { error } = validatePlayer(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const player = {
    name: req.body.name,
    franchise: req.body.franchise,
    rookieYear: req.body.rookieYear || "N/A",
  };
  players.push(player);
  res.send(player);
});

// input validation
const validatePlayer = (player) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    franchise: Joi.string().min(3).required(),
    rookieYear: Joi.number().min(1900).max(2020).required(),
  });
  return schema.validate(player);
};

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
