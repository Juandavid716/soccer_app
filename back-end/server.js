const express = require("express");
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

app.use(express.json());
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));
db.on('open', function(callback) {
	console.log('Connected to database.');
});

const Player =  mongoose.model("Player", 
    new mongoose.Schema({
	name: String,
    position: String,
    club: String,
    nation: String
	
}));


app.get("/api/v1/players/:search",async (req,res)=> {
    const players = await Player.find({name:  new RegExp([req.params['search']], 'i') })
    res.send(players)
})

app.get("/api/v1/players/",async (req,res)=> {
    const players = await Player.find()
    res.send(players)
})

app.listen(5000, (req, res) => {
    console.log("SERVER RUNNING");
  });