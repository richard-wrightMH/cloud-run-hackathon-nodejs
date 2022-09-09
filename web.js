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

  try {
    var x;
    var y;
    var dir;
    var dims = arena["dims"];
    var wasHit;
    moves = ["R"];
    for (const player in state) {
      if (
        player == "https://cloud-run-hackathon-nodejs-hircheuosa-uc.a.run.app"
      ) {
        console.log("SETTING COORD");
        var meObj = state[player];
        x = meObj["x"];
        y = meObj["y"];
        dir = meObj["direction"];
        wasHit = meObj["wasHit"];
      }
    }

    for (const enemy in state) {
      if (
        enemy != "https://cloud-run-hackathon-nodejs-hircheuosa-uc.a.run.app"
      ) {
        //check if anyone is next to me
        var enemyObj = state[enemy];
        var ex = enemyObj["x"];
        var ey = enemyObj["y"];
        var edir = enemyObj["direction"];

        if (wasHit) {
          if (dir == "N") {
            if ((ey == y - 1 && ex == x) || y == 0) {
              moves = ["R"];
            }
          } else if (dir == "S") {
            if ((ey == y + 1 && ex == x) || y == dims[1] - 1) {
              moves = ["R"];
            }
          } else if (dir == "E") {
            if ((ex == x + 1 && ey == y) || x == dims[0] - 1) {
              moves = ["R"];
            }
          } else if (dir == "W") {
            if ((ex == x - 1 && ey == y) || x == 0) {
              moves = ["R"];
            }
          } else {
            moves = ["F"];
          }
        }
      }
    }
    console.log("move:", moves[0]);
    console.log("dir", dir);
    console.log("x", x);
    console.log("y", y);
  } catch (e) {
    console.log("error", e);
  }

  // TODO add your implementation here to replace the random response

  res.send(moves[Math.floor(Math.random() * moves.length)]);
});

app.listen(process.env.PORT || 8080);
