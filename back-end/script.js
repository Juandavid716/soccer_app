const mongoose = require('mongoose');
const fetch = require('node-fetch');
require('dotenv').config();
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

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

function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

// console.log(JSON.stringify(arr2))

const apiCall = async  () =>{
   
    var totalPlayers = []
    let url ="https://www.easports.com/fifa/ultimate-team/api/fut/item?page=";
    const existPlayers = (await Player.find()).length;
    console.log(existPlayers)
    if(existPlayers == 0){

        let numPage = 1;
        let sw = true;
        while(sw == true){
            
            const response = await fetch(url + numPage).then(res => res.json())
            .then(text => {return text})
            .catch(err=> console.log(err));
            let totalPages = response.totalPages;
  
        
            response.items.map((elem)=> {
                
                let player = {
                    name: elem.name,
                    position: elem.position,
                    club: elem.club.name,
                    nation: elem.nation.name

                }
                
               totalPlayers.push(player)
               return player;
            })
            console.log(numPage);
            if(totalPages == numPage){
                sw = false;
               
            }
            numPage++;


        }
       
        const players = getUniqueListBy(totalPlayers, 'name')
      
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
