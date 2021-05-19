const FirebaseConfig  = require('../config/FirebaseConfig');
const getColor = require("../scripts/ExtractColorOther");

const setNewTournament = (data) =>{
    const database = FirebaseConfig();
    let torneosDatabase = database.ref('tournament').once('value').then(function (snapshot) {
        let responseOfDatabase = snapshot.val();
        let torneosDatabase = Object.values(responseOfDatabase);
        return torneosDatabase;
    }); 

    torneosDatabase.then(torneosDatabase => {
        let matchesFiltered = data.filter(status => status.status !== "canceled");
        let torneos = matchesFiltered.map(match => {
            let {league} = match;
            let {id, image_url, name} = league;
            if (image_url === null) {
                image_url = "https://i.ibb.co/85J2B3C/csgo-Logo-Default-Black.png";
            }
            return(
            {
                "id" : id,
                "image_url" : image_url,
                "name" : name,
            });
        })

        function comparer(otherArray){
            return function(current){
                return otherArray.filter(function(other){
                return other.id === current.id
                }).length === 0;
            }
        }
        let onlyInB = torneos.filter(comparer(torneosDatabase));
        let cleanTournaments = onlyInB.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);
        cleanTournaments.map( async (tournament) => {
            let colors = tournament.image_url !== "https://i.ibb.co/85J2B3C/csgo-Logo-Default-Black.png" && await getColor(tournament.image_url)
            database.ref().child('tournament/'+tournament.id).set({
                "id" : tournament.id,
                "image_url" : tournament.image_url,
                "name" : tournament.name,
                "colors": colors,
            });
        })
    });
}

module.exports = setNewTournament;