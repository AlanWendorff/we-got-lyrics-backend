const FirebaseConfig  = require('../../config/FirebaseConfig');
const getColor = require("../Helpers/ExtractColorOther");

const registerTeam = (concated, id) =>{
    const database = FirebaseConfig();
    let pathsDatabase = database.ref('teams').once('value').then(function (snapshot) {
        let responseOfDatabase = snapshot.val();
        let pathsDatabase = Object.values(responseOfDatabase);
        return pathsDatabase;
    }); 

    pathsDatabase.then(pathsDatabase => {
        let teams = [];
        let matchesFiltered = concated.filter(status => status.status !== "canceled");
        matchesFiltered.map(match => {
            let {opponents} = match;
            let counterTeam = opponents.find(element => element.opponent.id !== id);
            if (counterTeam.length !== 0) {
                let {id, image_url, name} = counterTeam.opponent;
                if (image_url === null) {
                    image_url = "https://i.ibb.co/85J2B3C/csgo-Logo-Default-Black.png";
                }
                teams.push(
                {
                    "id" : id,
                    "img" : image_url,
                    "name" : name,
                });
            }
        }) 
        
        function comparer(otherArray){
            return function(current){
                return otherArray.filter(function(other){
                return other.id === current.id
                }).length === 0;
            }
        }
        let onlyInB = teams.filter(comparer(pathsDatabase));
        
        let cleanTeam = onlyInB.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);
        cleanTeam.map(async (team)=> {
            let colors = team.img !== "https://i.ibb.co/85J2B3C/csgo-Logo-Default-Black.png" && await getColor(team.img)
            let {id} = team;
            if (id !== undefined) {
                database.ref().child('teams/'+id).set({
                    "id" : team.id,
                    "img" : team.img,
                    "name" : team.name,
                    "colors": colors,
                });
            }
        }) 
    });
}

module.exports = registerTeam;