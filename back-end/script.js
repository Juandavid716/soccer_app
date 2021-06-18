var mongoose = require('mongoose');
const fetch = require('node-fetch');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));
db.on('open', function(callback) {
	console.log('Connected to database.');
});


const playerSchema =  mongoose.Schema({
	name: String,
    position: String,
    club: String,
    nation: String
	
});

const Player = mongoose.model('Player', playerSchema);
// Name, nationality, club , position

const apiCall = async  () =>{
    let url ="https://www.easports.com/fifa/ultimate-team/api/fut/item";
    const existPlayers = (await Player.find()).length;

    if(existPlayers == 0){
        const response = await fetch(url).then(res => res.json())
        .then(text => {return text})
        .catch(err=> console.log(err));
        let players = response.items.map((elem)=> {
            
            let player = {
                name: elem.name,
                position: elem.position,
                club: elem.club.abbrName,
                nation: elem.nation.name

            }

        return player;
        
        }).filter((v,i,a)=>a.findIndex(t=>(t.name === v.name))===i)
        
        players.forEach(soccerPlayer => {

        const newPlayer = new Player({
                name: soccerPlayer.name,
                position: soccerPlayer.position,
                club: soccerPlayer.club,
                nation: soccerPlayer.nation,
            });
        newPlayer.save();
        
        
        });

    }
    
	
}
apiCall()
