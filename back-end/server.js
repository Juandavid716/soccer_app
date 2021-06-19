const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
require("dotenv").config();

app.use(express.json());
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error"));
db.on("open", function (callback) {
  console.log("Connected to database.");
});

const Player = mongoose.model(
  "Player",
  new mongoose.Schema({
    name: String,
    position: String,
    club: String,
    nation: String,
  })
);

//Get players by matching a string, example: localhost:5000/api/v1/players?search=cristi&order=asc&
app.get("/api/v1/players", async (req, res) => {
  console.log(req.query.search);
  const players =
    req.query.order == "des"
      ? await Player.find({ name: new RegExp(req.query.search, "i") }).sort({
          name: -1,
        })
      : await Player.find({ name: new RegExp(req.query.search, "i") }).sort({
          name: 1,
        });
  res.send(players);
});

// Get all players
app.get("/api/v1/players/", async (req, res) => {
  const players = await Player.find();
  res.send(players);
});

// Get players from a team
app.post("/api/v1/team", async (req, res) => {
  let nameTeam = req.body.name;

  const oneTeam = await Player.findOne({ club: new RegExp(nameTeam, "i") });
  try {
    const players = await Player.find({ club: new RegExp(oneTeam.club) });
    const team = {
      items: players.length,
      players: players,
    };
    res.send(team);
  } catch (error) {
    console.log(error);
    res.send([]);
  }
});

app.listen(5000, (req, res) => {
  console.log("SERVER RUNNING");
});
