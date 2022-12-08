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
  var grid = createGrid(arena.dims[0], arena.dim[1]);

  try {
    console.log(state);
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
      grid[i][j] = {};
    }
  }

  return grid;
}
