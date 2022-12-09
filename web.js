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
    var move;
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
      insertProperties(grid, enemies[i].y, enemies[i].x, 1);
    }
    console.log(grid);

    if (player.wasHit) {
      console.log("being hit!");
      if (
        hasNeighborsInDirection(
          arena,
          grid,
          player.y,
          player.x,
          player.direction,
          1
        ) == true
      ) {
        move = "L";
      } else {
        move = "F";
      }
    } else {
      if (
        hasNeighborsInDirection(
          arena,
          grid,
          player.y,
          player.x,
          player.direction,
          3
        ) == true
      ) {
        console.log("Throw!");
        move = "T";
      } else {
        if (
          walkingAtEdge(arena, player.y, player.x, player.direction) == true
        ) {
          move = "L";
        } else {
          move = "F";
        }
      }
    }
  } catch (e) {
    console.log("error", e);
  }

  // TODO add your implementation here to replace the random response
  console.log(move);
  res.send(move);
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
  grid[row][col] = properties;
}

function hasNeighborsInDirection(arena, grid, row, col, direction, distance) {
  // check the direction and iterate over the cells in that direction
  switch (direction) {
    case "N":
      for (var i = row - 1; i >= row - distance; i--) {
        if (i >= 0 && i <= arena.dims[1]) {
          if (grid[i][col] == 1) {
            // cell contains an object, so return true
            return true;
          }
        }
      }
      break;
    case "S":
      for (var i = row + 1; i <= row + distance; i++) {
        if (i >= 0 && i <= arena.dims[1]) {
          if (grid[i][col] == 1) {
            // cell contains an object, so return trues
            return true;
          }
        }
      }
      break;
    case "W":
      for (var j = col - 1; j >= col - distance; j--) {
        if (j >= 0 && j <= arena.dims[0]) {
          if (grid[row][j] == 1) {
            // cell contains an object, so return true
            return true;
          }
        }
      }
      break;
    case "E":
      for (var j = col + 1; j <= col + distance; j++) {
        if (j >= 0 && j <= arena.dims[0]) {
          if (grid[row][j] == 1) {
            // cell contains an object, so return true
            return true;
          }
        }
      }
      break;
  }
}

function walkingAtEdge(arena, row, col, direction) {
  // check the direction and iterate over the cells in that direction
  switch (direction) {
    case "N":
      if (row == 0) {
        return true;
      }
      break;
    case "S":
      if (row == arena.dims[1]) {
        return true;
      }
      break;
    case "W":
      if (col == 0) {
        return true;
      }
      break;
    case "E":
      if (col == arena.dims[0]) {
        return true;
      }
      break;
  }
}
