const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Let the battle begin!");
});

app.post("/", function (req, res) {
  var arena = req.body.arena;
  var state = req.body.arena.state;
  console.log(arena);
  console.log(state);

  try {
    for (const player in state) {
      if (
        player == "https://cloud-run-hackathon-nodejs-hircheuosa-uc.a.run.app"
      ) {
        console.log("ITS ME");
      }
    }
  } catch (e) {
    console.log("error", e);
  }
  const moves = ["F", "T", "L", "R"];

  // TODO add your implementation here to replace the random response

  res.send(moves[Math.floor(Math.random() * moves.length)]);
});

app.listen(process.env.PORT || 8080);
