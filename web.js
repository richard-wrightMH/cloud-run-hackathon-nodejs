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
    var enemyInFront = false;
    var shoot = false;
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
        if (dir == "N") {
          if ((ex = x && ey == y - 1)) {
            enemyInFront = true;
          }
          if ((ex = x && y - ey <= 2 && y - ey > 0)) {
            shoot = true;
          }
        } else if (dir == "S") {
          if ((ex = x && ey == y + 1)) {
            enemyInFront = true;
          }
          if ((ex = x && ey - y <= 2 && ey - y > 0)) {
            shoot = true;
          }
        } else if (dir == "E") {
          if ((ey = y && ex == x + 1)) {
            enemyInFront = true;
          }
          if ((ey = y && ex - x <= 2 && ex - x > 0)) {
            shoot = true;
          }
        } else if (dir == "W") {
          if ((ey = y && ex == x - 1)) {
            enemyInFront = true;
          }
          if ((ey = y && x - ex <= 2 && x - ex > 0)) {
            shoot = true;
          }
        }
      }
    }
    if (wasHit) {
      if (dir == "N") {
        if (enemyInFront || y == 0) {
          console.log("direction:", dir);
          console.log("enemy in front or y is 0:");
          moves = ["R"];
        }
      } else if (dir == "S") {
        if (enemyInFront || y == dims[1] - 1) {
          console.log("direction:", dir);
          console.log("enemy in front or y is:", dims[1] - 1);
          moves = ["R"];
        }
      } else if (dir == "E") {
        if (enemyInFront || x == dims[0] - 1) {
          console.log("direction:", dir);
          console.log("enemy in front or x is:", dims[0] - 1);
          moves = ["R"];
        }
      } else if (dir == "W") {
        if (enemyInFront || x == 0) {
          console.log("direction:", dir);
          console.log("enemy in front or x is 0:");
          moves = ["R"];
        }
      } else {
        moves = ["F"];
      }
    } else {
      if (dir == "N" && shoot) {
        moves = ["T"];
      } else if (dir == "S" && shoot) {
        moves = ["T"];
      } else if (dir == "E" && shoot) {
        moves = ["T"];
      } else if (dir == "W" && shoot) {
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
