const FirebaseConfig  = require('../config/FirebaseConfig');

const setNewTournament = (data) =>{
    const database = FirebaseConfig();
    let torneosDatabase = database.ref('tournament').once('value').then(function (snapshot) {
        let responseOfDatabase = snapshot.val();
        let torneosDatabase = Object.values(responseOfDatabase);
        return torneosDatabase;
    }); 

    torneosDatabase.then(torneosDatabase => {
        let torneos = [];
        let matchesFiltered = data.filter(status => status.status !== "canceled");
        matchesFiltered.map(match => {
            let {league} = match;
            let {id, image_url, name} = league;
            if (image_url === null) {
                image_url = "https://i.ibb.co/85J2B3C/csgo-Logo-Default-Black.png";
            }
            torneos.push(
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
        //console.log(cleanTournaments);
        cleanTournaments.map(tournament=> {
            database.ref().child('tournament/'+tournament.id).set({
                "id" : tournament.id,
                "image_url" : tournament.image_url,
                "name" : tournament.name,
            });
        })
    });
}

module.exports = setNewTournament;