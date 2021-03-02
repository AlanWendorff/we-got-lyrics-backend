const FirebaseConfig  = require('../config/FirebaseConfig');
const csgoLogo  = require('../images/csgoLogo');

const registerTeam = (data, Teamid) =>{

    const database = FirebaseConfig();
    let pathsDatabase = database.ref('paths').once('value').then(function (snapshot) {
        let responseOfDatabase = snapshot.val();
        let pathsDatabase = Object.values(responseOfDatabase);
        return pathsDatabase;
    }); 

    pathsDatabase.then(pathsDatabase => {
        let teams = [];
        const matchesFiltered = data.filter(status => status.status !== "canceled");
        matchesFiltered.map(match => {
            let {opponents} = match;
            const counterTeam = opponents.find(element => element.opponent.id !== Teamid);
            if (counterTeam.length !== 0) {
                let {id, image_url, name, slug} = counterTeam.opponent;
                if (image_url === null) {
                    image_url = csgoLogo();
                }
                teams.push(
                {
                    "id" : id,
                    "img" : image_url,
                    "name" : name,
                    "path" : slug
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
        cleanTeam.map(team=> {
            let {path} = team;
            if (path !== undefined) {
                database.ref().child('paths/'+path).push({
                    "id" : team.id,
                    "image_url" : team.image_url,
                    "name" : team.name,
                    "path" : team.path
                });
            }
        }) 
    });
}

module.exports = registerTeam;