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
    var allx = [];
    var ally = [];
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
        allx.push(ex);
        ally.push(ey);
      }
    }
    if (wasHit) {
      if (dir == "N") {
        if ((ally.includes(y - 1) && ex == x) || y == 0) {
          moves = ["R"];
        }
      } else if (dir == "S") {
        if ((ally.includes(y + 1) && ex == x) || y == dims[1] - 1) {
          moves = ["R"];
        }
      } else if (dir == "E") {
        if ((allx.includes(x + 1) && ey == y) || x == dims[0] - 1) {
          moves = ["R"];
        }
      } else if (dir == "W") {
        if ((allx.includes(x - 1) && ey == y) || x == 0) {
          moves = ["R"];
        }
      } else {
        moves = ["F"];
      }
    } else {
      if (dir == "N" && y - ey <= 2) {
        moves = ["T"];
      } else if (dir == "S" && ey - y <= 2) {
        moves = ["T"];
      } else if (dir == "E" && ex - x <= 2) {
        moves = ["T"];
      } else if (dir == "W" && x - ex <= 2) {
        moves = ["T"];
      }
    }
    console.log("new new style");
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
