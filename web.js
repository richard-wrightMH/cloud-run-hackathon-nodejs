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

  try {
    var x;
    var y;
    var dir;
    var dims = arena["dims"];
    moves = ["F"];
    for (const player in state) {
      if (
        player == "https://cloud-run-hackathon-nodejs-hircheuosa-uc.a.run.app"
      ) {
        console.log("SETTING COORD");
        var meObj = state[player];
        x = meObj["x"];
        y = meObj["y"];
        dir = meObj["direction"];
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

        if (dir == "N") {
          if (edir == "S" && y == ey - 1) {
            if (x != dims[0] - 1) {
              moves = ["R"];
            } else {
              moves = ["L"];
            }
          } else if (y - ey >= 3) {
            moves = ["T"];
          }
        }
        if (dir == "S") {
          if (edir == "N" && y == ey + 1) {
            if (x != dims[0] - 1) {
              moves = ["L"];
            } else {
              moves = ["R"];
            }
          } else if (ey - y >= 3) {
            moves = ["T"];
          }
        }
        if (dir == "E") {
          if (edir == "W" && x == ex - 1) {
            if (y != dims[1] - 1) {
              moves = ["L"];
            } else {
              moves = ["R"];
            }
          } else if (ex - x >= 3) {
            moves = ["T"];
          }
        }
        if (dir == "W") {
          if (edir == "E" && x == ex + 1) {
            if (y != dims[1] - 1) {
              moves = ["R"];
            } else {
              moves = ["L"];
            }
          } else if (x - ex >= 3) {
            moves = ["T"];
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
