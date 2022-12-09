const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Let the battle begin!");
});

app.post("/", function (req, res) {
  try {
    var arena = req.body.arena;
    var state = req.body.arena.state;
    var grid = createGrid(arena.dims[0], arena.dims[1]);
    var player = {};
    var enemies = [];
    console.log(arena.dims);

    // assigning player and array of enemies
    var keys = Object.keys(state);
    for (var key of keys) {
      if (
        key === "https://cloud-run-hackathon-nodejs-6pc4g4eqaq-uc.a.run.app"
      ) {
        // property is a player, so assign its values to the player variable
        player = state[key];
      } else {
        enemies.push(state[key]);
      }
    }

    //insert player and enemies into the grid
    grid[player.y][player.x] = player;

    for (var i = 0; i < enemies.length; i++) {
      insertProperties(grid, enemies[i].y, enemies[i].x, enemies[i]);
    }

    console.log(grid);
  } catch (e) {
    console.log("error", e);
  }

  // TODO add your implementation here to replace the random response

  res.send("F");
});

app.listen(process.env.PORT || 8080);

// all helper function

function createGrid(width, height) {
  // create the grid as a 2D array
  var grid = new Array(height);
  for (var i = 0; i < height; i++) {
    grid[i] = new Array(width);
  }

  // initialize the grid cells
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      grid[i][j] = 0;
    }
  }

  return grid;
}

function insertProperties(grid, row, col, properties) {
  // access the object at the given coordinate
  var obj = grid[row][col];

  // merge the new properties into the object
  Object.assign(obj, properties);
}
