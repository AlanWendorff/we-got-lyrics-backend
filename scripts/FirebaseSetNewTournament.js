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
        data.map(match => {
            let {league} = match;
            let {id, image_url, name} = league;
            torneos.push(
            {
                "id" : id,
                "image_url" : image_url,
                "name" : name
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

        cleanTournaments.map(tournament=> {
            database.ref().child('tournament').push(tournament);
        })
    });
}

module.exports = setNewTournament;